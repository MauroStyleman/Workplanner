namespace Workplanner.BL.RecurrenceStrategy;

public interface IRecurrenceStrategy
{
    IEnumerable<DateOnly> GetRecurrenceDates(DateOnly startDate, DateOnly endDate, int interval);
}
