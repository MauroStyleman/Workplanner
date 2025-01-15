using Workplanner.Domain;

namespace Workplanner.BL;

public interface IPlanningPeriodManager
{
    public PlanningPeriod? GetPlanningPeriodById(Guid id);
    public PlanningPeriod AddPlanningPeriod(DateOnly start, DateOnly end, string name);
    IEnumerable<PlanningPeriod> GetAllPlanningPeriods();
}