namespace Workplanner.Domain;

public class Shift
{
    Guid Id { get; set; }
    string Name { get; set; }
    TimeOnly Start { get; set; }
    TimeOnly End { get; set; }
    
}