namespace Workplanner.Domain;

public class Day
{
    Guid Id { get; set; }
    DateOnly Date { get; set; }
    List<Shift> Shifts { get; set; }
    PlanningPeriod PlanningPeriod { get; set; }
}