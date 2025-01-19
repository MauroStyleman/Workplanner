namespace Workplanner.Domain;

public static class ShiftColors
{
    private static readonly List<string> Colors = new()
    {
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700",
        "#8A2BE2", "#7FFF00", "#DC143C", "#00FFFF", "#FF4500",
        "#2E8B57", "#4B0082", "#800000", "#000080", "#20B2AA",
        "#FF6347", "#4682B4", "#D2691E", "#708090", "#9ACD32"
    };

    private static int currentIndex = 0;

    public static string GetNextColor()
    {
        var color = Colors[currentIndex];
        currentIndex = (currentIndex + 1) % Colors.Count;
        return color;
    }
}