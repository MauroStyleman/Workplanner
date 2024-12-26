namespace Workplanner.Domain;

public class Day
{
   public Guid Id { get; set; }
   public DateOnly Date { get; set; }
   public List<DayShift> DayShifts { get; set; }
   public PlanningPeriod PlanningPeriod { get; set; }
}