using Workplanner.Domain;

namespace Workplanner.BL;

public interface IPlanningShiftManager
{
    public List<PlanningShift> AddPlanningShifts(
        DateOnly date, 
        PlanningPeriod planningPeriod, 
        Shift shift, 
        User user,
        DateOnly start, 
        DateOnly end, 
        int interval,
        RecurrenceType recurrenceType);
    
    public PlanningShift AddPlanningShift(
        DateOnly date, 
        PlanningPeriod planningPeriod, 
        Shift shift, 
        User user);
}