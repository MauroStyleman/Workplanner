namespace Workplanner.BL.RecurrenceStrategy;

public class CustomRecurrenceStrategy : IRecurrenceStrategy
{
    public IEnumerable<DateOnly> GetRecurrenceDates(DateOnly startDate, DateOnly endDate, int interval)
    {
        for (var date = startDate; date <= endDate; date = date.AddDays(interval))
        {
            yield return date;
        }
    }
}
