using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IPlanningPeriodrepository 
{
    PlanningPeriod? GetPlanningPeriodById(Guid id);
    
    void CreatePlanningPeriod(PlanningPeriod planningPeriod);
    
}