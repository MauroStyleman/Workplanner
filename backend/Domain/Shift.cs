namespace Workplanner.Domain;

public class Shift
{
  public  Guid Id { get; set; }
  public  string Name { get; set; }
  public  TimeOnly Start { get; set; }
  public  TimeOnly End { get; set; }
  public  Day Day { get; set; }
  public  List<DayShift> DayShifts { get; set; }

    
}