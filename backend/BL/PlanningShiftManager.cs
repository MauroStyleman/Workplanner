using System.ComponentModel.DataAnnotations;
using Workplanner.BL.RecurrenceStrategy;
using Workplanner.DAL;
using Workplanner.Domain;

namespace Workplanner.BL;

public class PlanningShiftManager : IPlanningShiftManager
{
    private readonly IPlanningShiftRepository _planningShiftRepository;
    private readonly IShiftRepository _shiftRepository;
    private readonly IPlanningPeriodrepository _planningPeriodrepository;
    private readonly ILogger<PlanningShiftManager> _logger;

    public PlanningShiftManager(IPlanningShiftRepository planningShiftRepository, ILogger<PlanningShiftManager> logger,
        IShiftRepository shiftRepository, IPlanningPeriodrepository planningPeriodrepository)
    {
        _planningShiftRepository = planningShiftRepository;
        _logger = logger;
        _shiftRepository = shiftRepository;
        _planningPeriodrepository = planningPeriodrepository;
    }

    private bool ShiftAlreadyExists(DateOnly date, PlanningPeriod planningPeriod, Shift shift)
    {
        return _planningShiftRepository.Exists(date, planningPeriod.Id, shift.Id);
    }

    public List<PlanningShift> AddPlanningShifts(
        DateOnly date,
        Guid planningPeriodId,
        Guid shiftId,
        bool isRecurring = false,
        DateOnly? endDate = null,
        int interval = 1,
        RecurrenceType recurrenceType = RecurrenceType.Daily)
    {
        var planningShifts = new List<PlanningShift>();
        PlanningPeriod planningPeriod = _planningPeriodrepository.ReadPlanningPeriodById(planningPeriodId) ??
                                        throw new InvalidOperationException();
        Shift shift = _shiftRepository.ReadShiftById(shiftId) ?? throw new InvalidOperationException();

        ValidateDateWithinPlanningPeriod(date, planningPeriod);
        ValidateEndDate(endDate, date, planningPeriod);

        if (!isRecurring)
        {
            _logger.LogInformation("Adding a single planning shift.");
            if (ShiftAlreadyExists(date, planningPeriod, shift))
            {
                _logger.LogWarning($"Shift {shift.Id} already exists on {date}. Skipping.");
            }
            else
            {
                planningShifts.Add(AddPlanningShift(date, planningPeriod, shift));
            }

            return planningShifts;
        }

        var finalEndDate = endDate.HasValue && endDate.Value < planningPeriod.End
            ? endDate.Value
            : planningPeriod.End;

        _logger.LogInformation("Adding recurring planning shifts.");
        var recurrenceStrategy = RecurrenceStrategyFactory.GetStrategy(recurrenceType);
        var recurrenceDates = recurrenceStrategy.GetRecurrenceDates(date, finalEndDate, interval);

        foreach (var currentDate in recurrenceDates)
        {
            if (ShiftAlreadyExists(currentDate, planningPeriod, shift))
            {
                _logger.LogWarning($"Shift {shift.Id} already exists on {currentDate}. Skipping.");
                continue;
            }
            _logger.LogInformation($"Adding planning shift for {currentDate}.");
            try
            {
                planningShifts.Add(AddPlanningShift(currentDate, planningPeriod, shift));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to add planning shift for {currentDate}: {ex.Message}");
            }
        }

        return planningShifts;
    }


    private PlanningShift AddPlanningShift(DateOnly date, PlanningPeriod planningPeriod, Shift shift)
    {
        _logger.LogInformation("Adding a new planning shift.");
        var planningShift = new PlanningShift()
        {
            Date = date,
            PlanningPeriod = planningPeriod,
            Shift = shift,
        };

        _logger.LogInformation("Validating planning shift.");
        var validationContext = new ValidationContext(planningShift);
        Validator.ValidateObject(planningShift, validationContext, true);
        _logger.LogInformation("Planning shift validated.");
        _planningShiftRepository.CreatePlanningShift(planningShift);
        return planningShift;
    }

    private void ValidateDateWithinPlanningPeriod(DateOnly date, PlanningPeriod planningPeriod)
    {
        if (date < planningPeriod.Start || date > planningPeriod.End)
        {
            throw new ArgumentException("Date is not within the planning period.");
        }
    }

    private void ValidateEndDate(DateOnly? endDate, DateOnly startDate, PlanningPeriod planningPeriod)
    {
        if (endDate.HasValue && endDate.Value < startDate)
        {
            throw new ArgumentException("End date is before start date.");
        }

        if (endDate.HasValue && endDate.Value > planningPeriod.End)
        {
            throw new ArgumentException("End date is after the planning period end.");
        }
    }
}