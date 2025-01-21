using Microsoft.EntityFrameworkCore;
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

    public IEnumerable<PlanningPeriod> ReadAllPlanningPeriods()
    {
        _logger.LogInformation("Getting all planning periods.");
        return _context.PlanningPeriods.ToList();
    }

    /*
     * Eager loading is the best approach in this case because:
     * You want to load all related data in one go to ensure a fast and smooth user experience.
     * It prevents the N+1 query problem, which could significantly impact performance.
     * You are likely dealing with a known structure,
     * so eager loading ensures you load the data you need right away without additional database queries.
     */
    public PlanningPeriod ReadPlanningPeriodWithShifts(Guid planningPeriodId)
    {
        _logger.LogInformation("Getting planning period with shifts.");
        var  planningPeriod = _context.PlanningPeriods
            .Include(pp => pp.PlanningShifts) 
            .ThenInclude(ps => ps.Shift)     
            .Single(pp => pp.Id == planningPeriodId);
        _logger.LogInformation("Planning period with shifts retrieved.");
        return planningPeriod;
    }
}