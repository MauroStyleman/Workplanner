using Microsoft.EntityFrameworkCore;
using Workplanner.Domain;

namespace Workplanner.DAL;

public class WorkPlannerDbContext : DbContext
{
  public  DbSet<PlanningPeriod> PlanningPeriods { get; set; }
  public  DbSet<User> Users { get; set; }
  public  DbSet<Shift> Shifts { get; set; }
  public  DbSet<PlanningShift> PlanningShifts { get; set; }
    
    public WorkPlannerDbContext(DbContextOptions<WorkPlannerDbContext> options) 
        : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<PlanningPeriod>()
            .HasMany(pp => pp.PlanningShifts)
            .WithOne(ps => ps.PlanningPeriod);

        modelBuilder.Entity<Shift>()
            .HasMany(s => s.PlanningShifts)
            .WithOne(ps => ps.Shift);

        modelBuilder.Entity<User>()
            .HasMany(u => u.PlanningShifts)
            .WithOne(ps => ps.User);

        base.OnModelCreating(modelBuilder);
    }

}