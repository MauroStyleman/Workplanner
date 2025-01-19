using System.ComponentModel.DataAnnotations;

namespace Workplanner.Controllers.dto;

public class ShiftDto
{
    public Guid Id { get; set; }
    [Required] public TimeOnly Start { get; set; }
    [Required] public TimeOnly End { get; set; }
    [Required] [MaxLength(20)] public required string Name { get; set; }
    [Required] public string Color { get; set; } 

}