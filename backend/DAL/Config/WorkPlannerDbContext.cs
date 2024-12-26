using Microsoft.EntityFrameworkCore;
using Workplanner.Domain;

namespace Workplanner.DAL;

public class WorkPlannerDbContext : DbContext
{
  public  DbSet<PlanningPeriod> PlanningPeriods { get; set; }
  public  DbSet<Day> Days { get; set; }
  public  DbSet<Shift> Shifts { get; set; }
  public  DbSet<DayShift> DayShifts { get; set; }
    
    public WorkPlannerDbContext(DbContextOptions<WorkPlannerDbContext> options) 
        : base(options)
    {
    }
}