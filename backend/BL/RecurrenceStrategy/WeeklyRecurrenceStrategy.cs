namespace Workplanner.BL.RecurrenceStrategy;

public class WeeklyRecurrenceStrategy : IRecurrenceStrategy
{
    public IEnumerable<DateOnly> GetRecurrenceDates(DateOnly startDate, DateOnly endDate, int interval)
    {
        for (var date = startDate; date <= endDate; date = date.AddDays(7 * interval))
        {
            yield return date;
        }
    }
}
