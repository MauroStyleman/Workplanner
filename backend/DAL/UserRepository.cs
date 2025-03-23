using Workplanner.Domain;

namespace Workplanner.DAL;

public class UserRepository : IUserRepository
{
    private readonly WorkPlannerDbContext _context;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(WorkPlannerDbContext context, ILogger<UserRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public User? ReadUserById(Guid id)
    {
        _logger.LogInformation("Getting user by id.");
        return _context.Users.Find(id);
    }

    public IEnumerable<User> ReadAllUsers()
    {
        _logger.LogInformation("Getting all users.");
        return _context.Users.ToList();
    }

    public void CreateUser(User user)
    {
        _logger.LogInformation("Creating a new user.");
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public IQueryable<User> SearchUsersByName(string name)
    {
        _logger.LogInformation("Searching for users by name.");
    
        var lowerName = name.ToLower();

        return _context.Users
            .Where(user => user.FirstName.ToLower().Contains(lowerName) || user.LastName.ToLower().Contains(lowerName));
    }
}