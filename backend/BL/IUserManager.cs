using Workplanner.Domain;

namespace Workplanner.BL;

public interface IUserManager
{
    User? GetUserById(Guid id);
    IEnumerable<User> GetAllUsers();
    User CreateUser(string firstName, string lastName, string email);
    
    IEnumerable<User>? SearchUsersByName(string name);

}