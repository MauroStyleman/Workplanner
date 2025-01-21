namespace Workplanner.Controllers.dto;

public class PlanningShiftDto
{
    public Guid Id { get; set; }              
    public DateOnly Date { get; set; }        
    public Guid PlanningPeriodId { get; set; }
    public Guid ShiftId { get; set; }


}

