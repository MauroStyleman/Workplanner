using System.ComponentModel.DataAnnotations;

namespace Workplanner.Controllers.dto;

public class AddUserDto
{
    [Required] public string firstName { get; set; }
    [Required] public string lastName { get; set; }
    [Required][EmailAddress] public string email { get; set; } 
}