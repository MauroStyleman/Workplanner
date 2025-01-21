using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IPlanningPeriodrepository 
{
    PlanningPeriod? ReadPlanningPeriodById(Guid id);
    
    void CreatePlanningPeriod(PlanningPeriod planningPeriod);
    
    IEnumerable<PlanningPeriod> ReadAllPlanningPeriods();


    PlanningPeriod ReadPlanningPeriodWithShifts(Guid planningPeriodId);

}