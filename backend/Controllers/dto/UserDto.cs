using System.ComponentModel.DataAnnotations;

namespace Workplanner.Controllers.dto;

public class UserDto
{
    public Guid Id { get; set; }
    [Required] public string firstName { get; set; }
    [Required] public string lastName { get; set; }
    [Required][EmailAddress] public string email { get; set; } 
}