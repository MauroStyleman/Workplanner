using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Workplanner.BL;
using Workplanner.Controllers.dto;
using Workplanner.Domain;

namespace Workplanner.Controllers.api;

[ApiController]
[Route("/api/[controller]")]
public class PlanningPeriodController : ControllerBase
{
    private readonly IPlanningPeriodManager _manager;

    public PlanningPeriodController(IPlanningPeriodManager manager)
    {
        _manager = manager;
    }
    [HttpGet("{id}")]
    public ActionResult<PlanningPeriodDto> GetPlanningPeriodById(Guid id)
    {
        var planningPeriod = _manager.GetPlanningPeriodById(id);

        if (planningPeriod == null)
        {
            return NotFound(); 
        }

        return Ok(new PlanningPeriodDto()
        {
            Id = planningPeriod.Id,
            Start = planningPeriod.Start,
            End = planningPeriod.End,
            Name = planningPeriod.Name
        }); 
    }
    
    [HttpPost]
    public ActionResult<AddPlanningPeriodDto> AddPlanningPeriod(AddPlanningPeriodDto addPlanningPeriodDto)
    {
        var planningPeriod = _manager.AddPlanningPeriod(
            addPlanningPeriodDto.Start,
            addPlanningPeriodDto.End, 
            addPlanningPeriodDto.Name);

        return CreatedAtAction(
            nameof(GetPlanningPeriodById),
            new { id = planningPeriod.Id },
            planningPeriod);
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<PlanningPeriodDto>> GetAllPlanningPeriods()
    {
        var planningPeriods = _manager.GetAllPlanningPeriods();
        return Ok(planningPeriods.Select(p => new PlanningPeriodDto()
        {
            Id = p.Id,
            Start = p.Start,
            End = p.End,
            Name = p.Name
        }));
    }
    
    [HttpGet("withShift/{id}")]
    public ActionResult<PlanningPeriodWithPlanningShiftsDto> GetPlanningPeriodWithShifts(Guid id)
    {
        var planningPeriodWithShifts = _manager.GetPlanningPeriodWithShifts(id);

        if (planningPeriodWithShifts == null)
        {
            return NotFound($"PlanningPeriod with ID {id} not found.");
        }
        
        var response = new PlanningPeriodWithPlanningShiftsDto
        {
            Id = planningPeriodWithShifts.Id,
            Start = planningPeriodWithShifts.Start,
            End = planningPeriodWithShifts.End,
            Name = planningPeriodWithShifts.Name,
            PlanningShiftsDtos = planningPeriodWithShifts.PlanningShifts.Select(ps => new PlanningShiftDtoWithShifts
            {
                Id = ps.Id,
                Date = ps.Date,
                PlanningPeriodId = planningPeriodWithShifts.Id,
                Shift = new ShiftDto
                {
                    Id = ps.Shift.Id,
                    Name = ps.Shift.Name,
                    Start = ps.Shift.Start,
                    End = ps.Shift.End,
                    Color = ps.Shift.Color
                }
            }).ToList()
        };

        return Ok(response);
    }


}