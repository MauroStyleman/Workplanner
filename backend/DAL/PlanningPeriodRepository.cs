using Workplanner.Domain;

namespace Workplanner.DAL;

public class PlanningPeriodRepository : IPlanningPeriodrepository
{
    private readonly WorkPlannerDbContext _context;
    private readonly ILogger<PlanningPeriodRepository> _logger;


    public PlanningPeriodRepository(WorkPlannerDbContext context,ILogger<PlanningPeriodRepository> logger)
    {
        _context = context;
        _logger = logger;
    }


    public PlanningPeriod? ReadPlanningPeriodById(Guid id)
    {
        _logger.LogInformation("Getting planning period by id.");
        return _context.PlanningPeriods.SingleOrDefault(p => p.Id == id);
    }

    public void CreatePlanningPeriod(PlanningPeriod planningPeriod)
    {
        _logger.LogInformation("Creating a new planning period.");
        _context.PlanningPeriods.Add(planningPeriod);
        _context.SaveChanges();
        _logger.LogInformation("Planning period created.");
    }
}