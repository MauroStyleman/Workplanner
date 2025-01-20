using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IPlanningShiftRepository
{
    void CreatePlanningShift(PlanningShift planningShift);
}