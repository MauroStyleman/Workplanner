using Workplanner.Domain;

namespace Workplanner.BL;

public interface IPlanningShiftManager
{
    public List<PlanningShift> AddPlanningShifts(
        DateOnly date,
        Guid planningPeriodId,
        Guid shiftId,
        bool isRecurring = false,
        DateOnly? endDate = null,
        int interval = 1,
        RecurrenceType recurrenceType = RecurrenceType.Daily);
    
    

}