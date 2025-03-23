using System.ComponentModel.DataAnnotations;
using Workplanner.DAL;
using Workplanner.Domain;

namespace Workplanner.BL;

public class UserManager : IUserManager
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserManager> _logger;

    public UserManager(IUserRepository userRepository, ILogger<UserManager> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public User? GetUserById(Guid id)
    {
        _logger.LogInformation("Getting user by id.");
        return _userRepository.ReadUserById(id);
    }

    public IEnumerable<User> GetAllUsers()
    {
        _logger.LogInformation("Getting all users.");
        return _userRepository.ReadAllUsers();
    }

    public User CreateUser(string firstName, string lastName, string email)
    {
        _logger.LogInformation("Creating a new user.");
        var user= new User()
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email
        };
        _logger.LogInformation("validate user.");
        var validationContext = new ValidationContext(user);
        Validator.ValidateObject(user,validationContext,true);
        _logger.LogInformation("User validated.");
        _userRepository.CreateUser(user);
        return user;
    }

    public IQueryable<User>? SearchUsersByName(string name)
    {
        _logger.LogInformation("Searching for users by name.");

        if (string.IsNullOrWhiteSpace(name))
        {
            _logger.LogWarning("Search term is null or empty.");
            return null;
        }

        var lowerName = name.ToLower();
        var users = _userRepository.SearchUsersByName(lowerName);

        if (users == null || !users.Any())
        {
            _logger.LogWarning("No users found with the given name: {Name}", name);
            return null;
        }

        return users;
    }


}