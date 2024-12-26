namespace Workplanner.Domain;

public class PlanningPeriod
{
    Guid Id { get; set; }
    DateOnly Start { get; set; }
    DateOnly End { get; set; }
}