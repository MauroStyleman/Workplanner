using System.ComponentModel.DataAnnotations;

namespace Workplanner.Domain;

public class Shift
{
    public Guid Id { get; set; }
    [Required] [MaxLength(20)] public string Name { get; set; }
    [Required] public TimeOnly Start { get; set; }
    [Required] public TimeOnly End { get; set; }
    [Required] public string Color { get; set; } 

    public List<PlanningShift> PlanningShifts { get; set; }
}