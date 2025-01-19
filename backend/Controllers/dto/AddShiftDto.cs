using System.ComponentModel.DataAnnotations;

namespace Workplanner.Controllers.dto;

public class AddShiftDto
{
    [Required] public string Start { get; set; }
    [Required] public string End { get; set; }
    [Required] [MaxLength(20)] public required string Name { get; set; }
}