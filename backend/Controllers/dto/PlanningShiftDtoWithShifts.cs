namespace Workplanner.Controllers.dto;

public class PlanningShiftDtoWithShifts
{
    public Guid Id { get; set; }              
    public DateOnly Date { get; set; }        
    public Guid PlanningPeriodId { get; set; }
    public ShiftDto Shift { get; set; }

}