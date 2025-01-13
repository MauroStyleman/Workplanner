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
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Day>()
            .HasOne(d => d.PlanningPeriod) 
            .WithMany(pp => pp.Days) 
            .OnDelete(DeleteBehavior.Cascade);  

    
        modelBuilder.Entity<DayShift>()
            .HasKey(ds => new { ds.DayId, ds.ShiftId });

        modelBuilder.Entity<DayShift>()
            .HasOne(ds => ds.Day)
            .WithMany(d => d.DayShifts);

        modelBuilder.Entity<DayShift>()
            .HasOne(ds => ds.Shift)
            .WithMany(s => s.DayShifts);

        modelBuilder.Entity<Shift>()
            .HasMany(s => s.DayShifts)
            .WithOne(ds => ds.Shift);

        modelBuilder.Entity<PlanningPeriod>()
            .HasKey(pp => pp.Id);  

        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);  

        base.OnModelCreating(modelBuilder);
    }
}