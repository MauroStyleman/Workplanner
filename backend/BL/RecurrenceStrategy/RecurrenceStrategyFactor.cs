using Workplanner.Domain;

namespace Workplanner.BL.RecurrenceStrategy;

public class RecurrenceStrategyFactory
{
    public static IRecurrenceStrategy GetStrategy(RecurrenceType recurrenceType)
    {
        return recurrenceType switch
        {
            RecurrenceType.Daily => new DailyRecurrenceStrategy(),
            RecurrenceType.Weekly => new WeeklyRecurrenceStrategy(),
            RecurrenceType.Custom => new CustomRecurrenceStrategy(),
            _ => throw new NotImplementedException($"Recurrence type {recurrenceType} is not supported.")
        };
    }
}
