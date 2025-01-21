using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IPlanningShiftRepository
{
    void CreatePlanningShift(PlanningShift planningShift);
    public bool Exists(DateOnly date, Guid planningPeriodId, Guid shiftId);
}