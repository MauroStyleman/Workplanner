namespace Workplanner.Domain;

public class PlanningPeriod
{
    Guid Id { get; set; }
    DateTime Start { get; set; }
    DateTime End { get; set; }
}