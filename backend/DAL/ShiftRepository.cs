using Workplanner.Domain;

namespace Workplanner.DAL;

public class ShiftRepository : IShiftRepository
{
    
    private readonly WorkPlannerDbContext _context;
    private readonly ILogger<ShiftRepository> _logger;


    public ShiftRepository(WorkPlannerDbContext context,ILogger<ShiftRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    
    public Shift? ReadShiftById(Guid id)
    {
        _logger.LogInformation("Getting shift by id.");
        return _context.Shifts.SingleOrDefault(s => s.Id == id);
    }

    public void CreateShift(Shift shift)
    {
        _logger.LogInformation("Creating a new shift.");
        _context.Shifts.Add(shift);
        _context.SaveChanges();
        _logger.LogInformation("Shift created.");
    }

    public IEnumerable<Shift> ReadAllShifts()
    {
        _logger.LogInformation("Getting all shifts.");
        return _context.Shifts.ToList();
    }

    public IQueryable<Shift> ReadAllShiftsThatDontExistYetOnPlanningShift(DateOnly selectedDate,Guid planningPeriodId)
    {
        _logger.LogInformation("Getting all shifts that don't exist yet on planning shift.");
        return _context.Shifts.Where(s => !_context.PlanningShifts.Any(ps =>
            ps.Date == selectedDate && ps.PlanningPeriod.Id == planningPeriodId && ps.Shift.Id == s.Id));
    }
}