namespace Workplanner.DAL;

public class WorkPlannerInitializer
{
    private static bool _hasBeenInitialized = false;

    public static void Initialize(WorkPlannerDbContext context,
        bool dropDatabase = false)
    {
        if (!_hasBeenInitialized)
        {
            if (dropDatabase)
                context.Database.EnsureDeleted();
            
            _hasBeenInitialized = true;
        }
    }
}