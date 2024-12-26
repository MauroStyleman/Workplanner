namespace Workplanner.Domain;

public class PlanningPeriod
{
  public  Guid Id { get; set; }
  public  DateOnly Start { get; set; }
  public  DateOnly End { get; set; }
}