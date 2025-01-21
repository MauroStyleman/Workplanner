using System.ComponentModel.DataAnnotations;

namespace Workplanner.Controllers.dto;

public class PlanningPeriodWithPlanningShiftsDto
{
    public Guid Id { get; set; }
    [Required] public DateOnly Start { get; set; }
    [Required] public DateOnly End { get; set; }
    [Required] [MaxLength(20)] public required string Name { get; set; }
    public List<PlanningShiftDtoWithShifts> PlanningShiftsDtos { get; set; }
    
}