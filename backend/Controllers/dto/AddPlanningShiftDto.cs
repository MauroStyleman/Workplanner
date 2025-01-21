using Workplanner.Domain;

namespace Workplanner.Controllers.dto;

public class AddPlanningShiftDto
{
    public DateOnly Date { get; set; }
    public Guid PlanningPeriodId { get; set; }
    public Guid ShiftId { get; set; }

    public bool IsRecurring { get; set; } = false;
    public DateOnly? EndDate { get; set; }
    public int Interval { get; set; } = 1;
    public RecurrenceType RecurrenceType { get; set; } = RecurrenceType.Daily;
}