using System.ComponentModel.DataAnnotations;

namespace Workplanner.Domain;

public class Shift
{
    public Guid Id { get; set; }
    [Required] [MaxLength(20)] public string Name { get; set; }
    [Required] public string Start { get; set; }
    [Required] public string End { get; set; }
    [Required] public string Color { get; set; } 

    public List<PlanningShift> PlanningShifts { get; set; }
}