using System.ComponentModel.DataAnnotations;
using Workplanner.DAL;
using Workplanner.Domain;

namespace Workplanner.BL;

public class ShiftManager : IShiftManager
{
    private readonly IShiftRepository _shiftRepository;
    private readonly ILogger<ShiftManager> _logger;

    public ShiftManager(IShiftRepository shiftRepository, ILogger<ShiftManager> logger)
    {
        _shiftRepository = shiftRepository;
        _logger = logger;
    }

    public Shift? GetShiftById(Guid id)
    {
       _logger.LogInformation("Getting shift by id.");
       return _shiftRepository.ReadShiftById(id);
    }

    public Shift AddShift(string name, string start, string end)
    {
        _logger.LogInformation("Adding a new shift.");
        var shift = new Shift()
        {
            Name = name,
            Start = start,
            End = end,
            Color = ShiftColors.GetNextColor()
        };
        _logger.LogInformation("Validating shift.");
        var validationContext = new ValidationContext(shift);
        Validator.ValidateObject(shift,validationContext,true);
        _logger.LogInformation("Shift validated.");
        _shiftRepository.CreateShift(shift);
        return shift;
    }

    public IEnumerable<Shift> GetAllShifts()
    {
        _logger.LogInformation("Getting all shifts.");
        return _shiftRepository.ReadAllShifts();
    }

    public IEnumerable<Shift> GetAllShiftsThatDontExistYetOnPlanningShift(DateOnly selectedDate, Guid planningPeriodId)
    {
        _logger.LogInformation("Getting all shifts that don't exist yet on planning shift.");
        return _shiftRepository.ReadAllShiftsThatDontExistYetOnPlanningShift(selectedDate, planningPeriodId);
    }
}