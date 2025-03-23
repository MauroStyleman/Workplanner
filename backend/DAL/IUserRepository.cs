using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IUserRepository
{
    User? ReadUserById(Guid id);
    IEnumerable<User> ReadAllUsers();
    void CreateUser(User user);
    
    IQueryable<User>? SearchUsersByName(string name);

}