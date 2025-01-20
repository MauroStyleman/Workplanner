using System.ComponentModel.DataAnnotations;
using Workplanner.DAL;
using Workplanner.Domain;

namespace Workplanner.BL;

public class PlanningShiftManager : IPlanningShiftManager
{
    private readonly IPlanningShiftRepository _planningShiftRepository;
    private readonly ILogger<PlanningShiftManager> _logger;

    public PlanningShiftManager(IPlanningShiftRepository planningShiftRepository, ILogger<PlanningShiftManager> logger)
    {
        _planningShiftRepository = planningShiftRepository;
        _logger = logger;
    }


    public List<PlanningShift> AddPlanningShifts(DateOnly date, PlanningPeriod planningPeriod, Shift shift, User user, DateOnly start,
        DateOnly end, int interval, RecurrenceType recurrenceType)
    {
        throw new NotImplementedException();
    }

    public PlanningShift AddPlanningShift(DateOnly date, PlanningPeriod planningPeriod, Shift shift, User user)
    {
        _logger.LogInformation("Adding a new planning shift.");
        var planningShift = new PlanningShift()
        {
            Date = date,
            PlanningPeriod = planningPeriod,
            Shift = shift,
            User = user
        };

        _logger.LogInformation("Validating planning shift.");
        var validationContext = new ValidationContext(planningShift);
        Validator.ValidateObject(planningShift, validationContext, true);
        _logger.LogInformation("Planning shift validated.");
        _planningShiftRepository.CreatePlanningShift(planningShift);
        return planningShift;
    }
}