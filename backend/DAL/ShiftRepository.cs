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
}