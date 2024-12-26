using Microsoft.EntityFrameworkCore;
using Workplanner.Domain;

namespace Workplanner.DAL;

public class WorkPlannerDbContext : DbContext
{
    DbSet<PlanningPeriod> PlanningPeriods { get; set; }
    DbSet<Day> Days { get; set; }
    DbSet<Shift> Shifts { get; set; }
    DbSet<DayShift> DayShifts { get; set; }
    
    public WorkPlannerDbContext(DbContextOptions<WorkPlannerDbContext> options) 
        : base(options)
    {
    }
}