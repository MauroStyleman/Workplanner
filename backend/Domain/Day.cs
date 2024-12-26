namespace Workplanner.Domain;

public class Day
{
    Guid Id { get; set; }
    DateOnly Date { get; set; }
    List<DayShift> DayShifts { get; set; }
    PlanningPeriod PlanningPeriod { get; set; }
}