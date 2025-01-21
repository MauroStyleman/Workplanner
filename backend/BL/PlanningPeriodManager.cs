using System.ComponentModel.DataAnnotations;
using Workplanner.DAL;
using Workplanner.Domain;

namespace Workplanner.BL;

public class PlanningPeriodManager : IPlanningPeriodManager
{

    private readonly IPlanningPeriodrepository _planningPeriodRepository;
    private readonly ILogger<PlanningPeriodManager> _logger;

    public PlanningPeriodManager(IPlanningPeriodrepository planningPeriodRepository, ILogger<PlanningPeriodManager> logger)
    {
        _planningPeriodRepository = planningPeriodRepository;
        _logger = logger;
    }

    public PlanningPeriod? GetPlanningPeriodById(Guid id)
    {
        _logger.LogInformation("Getting planning period by id.");
       return  _planningPeriodRepository.ReadPlanningPeriodById(id);
    }

    public PlanningPeriod AddPlanningPeriod(DateOnly start, DateOnly end, string name)
    {
        _logger.LogInformation("Adding a new planning period.");
        var planningPeriod = new PlanningPeriod()
        {
            Start = start,
            End = end,
            Name = name
        };

        _logger.LogInformation("Validating planning period.");
        var validationContext = new ValidationContext(planningPeriod);
        Validator.ValidateObject(planningPeriod,validationContext,true);
        _logger.LogInformation("Planning period validated.");
        _planningPeriodRepository.CreatePlanningPeriod(planningPeriod);
        return planningPeriod;

    }

    public IEnumerable<PlanningPeriod> GetAllPlanningPeriods()
    {
        _logger.LogInformation("Getting all planning periods.");
        return _planningPeriodRepository.ReadAllPlanningPeriods();
    }

    public PlanningPeriod GetPlanningPeriodWithShifts(Guid planningPeriodId)
    {
        _logger.LogInformation("Getting planning period with shifts.");
        return _planningPeriodRepository.ReadPlanningPeriodWithShifts(planningPeriodId);
    }
}