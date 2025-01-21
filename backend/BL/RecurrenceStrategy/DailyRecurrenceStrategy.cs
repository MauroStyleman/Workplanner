namespace Workplanner.BL.RecurrenceStrategy;

public class DailyRecurrenceStrategy : IRecurrenceStrategy
{
    /*
     * The yield keyword in C# is used to simplify the implementation of iterators.
     * It allows a method to return elements one at a time as they are produced,
     * without the need to create, populate, and return an entire collection at once.
     * When you use yield in a method, the method is treated as an iterator.
     * Instead of returning all the results at once,
     * it produces values one at a time,
     * pausing execution after each yield return and resuming when the next value is requested
     * (e.g., when iterating over the results with a foreach loop).
     */
    public IEnumerable<DateOnly> GetRecurrenceDates(DateOnly startDate, DateOnly endDate, int interval)
    {
        for (var date = startDate; date <= endDate; date = date.AddDays(interval))
        {
            yield return date;
        }
    }
}