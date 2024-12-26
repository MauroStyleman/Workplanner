namespace Workplanner.Domain;

public class DayShift
{
    public Guid DayId { get; set; }
    public Day Day { get; set; }

    public Guid ShiftId { get; set; }
    public Shift Shift { get; set; }
}