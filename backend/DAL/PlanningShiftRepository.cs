using Workplanner.Domain;

namespace Workplanner.DAL;

public class PlanningShiftRepository : IPlanningShiftRepository
{
    private readonly WorkPlannerDbContext _context;
    private readonly ILogger<PlanningPeriodRepository> _logger;

    public PlanningShiftRepository(WorkPlannerDbContext context, ILogger<PlanningPeriodRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public void CreatePlanningShift(PlanningShift planningShift)
    {
        _logger.LogInformation("Creating a new planning shift.");
        _context.PlanningShifts.Add(planningShift);
        _context.SaveChanges();
        _logger.LogInformation("Planning shift created.");
    }
    
    public bool Exists(DateOnly date, Guid planningPeriodId, Guid shiftId)
    {
        return _context.PlanningShifts.Any(ps =>
            ps.Date == date &&
            ps.PlanningPeriod.Id == planningPeriodId &&
            ps.Shift.Id == shiftId);
    }

}