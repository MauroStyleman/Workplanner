using System.Text.Json.Serialization;

namespace Workplanner.Domain;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum RecurrenceType
{
    Daily,
    Weekly,
    Custom
}