using Microsoft.AspNetCore.Mvc;
using Workplanner.BL;
using Workplanner.Controllers.dto;
using Workplanner.Domain;

namespace Workplanner.Controllers.api;

[Route("api/[controller]")]
[ApiController]
public class PlanningShiftController : ControllerBase
{
    private readonly IPlanningShiftManager _manager;

    public PlanningShiftController(IPlanningShiftManager manager)
    {
        _manager = manager;
    }
    

    [HttpPost("add")]
    public ActionResult<List<PlanningShiftDto>> AddPlanningShifts(AddPlanningShiftDto addPlanningShiftDto)
    {
        var planningShifts = _manager.AddPlanningShifts(
            addPlanningShiftDto.Date,
            addPlanningShiftDto.PlanningPeriodId, 
            addPlanningShiftDto.ShiftId,
            addPlanningShiftDto.IsRecurring,
            addPlanningShiftDto.EndDate,
            addPlanningShiftDto.Interval,
            addPlanningShiftDto.RecurrenceType
        );

        var response = planningShifts.Select(ps => new PlanningShiftDto
        {
            Id = ps.Id,
            Date = ps.Date,
            PlanningPeriodId = ps.PlanningPeriod.Id,
            ShiftId = ps.Shift.Id,
        }).ToList();
        
        return StatusCode(StatusCodes.Status201Created, response);
    }
}