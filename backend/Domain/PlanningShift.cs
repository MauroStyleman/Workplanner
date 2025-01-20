using System.Diagnostics.CodeAnalysis;

namespace Workplanner.Domain;

public class PlanningShift
{
    public Guid Id { get; set; }
    
    public DateOnly Date { get; set; }
    public PlanningPeriod PlanningPeriod { get; set; }
    public Shift Shift { get; set; }
   [AllowNull] public User User { get; set; }
}