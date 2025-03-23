using Microsoft.AspNetCore.Mvc;
using Workplanner.BL;
using Workplanner.Controllers.dto;
using Workplanner.Domain;

namespace Workplanner.Controllers.api;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserManager _manager;

    public UserController(IUserManager manager)
    {
        _manager = manager;
    }

    [HttpGet("{id}")]
    public ActionResult<UserDto> GetUserById(Guid id)
    {
        var user = _manager.GetUserById(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserDto()
        {
            Id = user.Id,
            firstName = user.FirstName,
            lastName = user.LastName,
            email = user.Email
        });
    }

    [HttpPost]
    public ActionResult<AddUserDto> AddUser(AddUserDto addUserDto)
    {
        var user = _manager.CreateUser(
            addUserDto.firstName,
            addUserDto.lastName,
            addUserDto.email);

        return CreatedAtAction(
            nameof(GetUserById),
            new { id = user.Id },
            user);
    }

    [HttpGet]
    public ActionResult<IEnumerable<UserDto>> GetAllUsers()
    {
        var users = _manager.GetAllUsers();
        return Ok(users.Select(user => new UserDto()
        {
            Id = user.Id,
            firstName = user.FirstName,
            lastName = user.LastName,
            email = user.Email
        }));
    }

    [HttpGet("search")]
    public ActionResult<IEnumerable<UserDto>> SearchUsersByName(string name)
    {
        var users = _manager.SearchUsersByName(name)?.ToList(); 

        if (users == null || users.Count == 0) 
        {
            return NotFound();
        }

        return Ok(users.Select(user => new UserDto
        {
            Id = user.Id,
            firstName = user.FirstName,
            lastName = user.LastName,
            email = user.Email
        }));
    }

}