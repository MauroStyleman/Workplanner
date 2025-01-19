using Workplanner.Domain;

namespace Workplanner.BL;

public interface IShiftManager
{
    Shift? GetShiftById(Guid id);
    
    Shift AddShift(string name,string start, string end);
    
    IEnumerable<Shift> GetAllShifts();
}