using Microsoft.AspNetCore.Mvc;
using Workplanner.BL;
using Workplanner.Controllers.dto;

namespace Workplanner.Controllers.api;

[ApiController]
[Route("/api/[controller]")]
public class ShiftController : ControllerBase
{
    private readonly IShiftManager _manager;
    
    
    public ShiftController(IShiftManager manager)
    {
        _manager = manager;
    }
    
    [HttpGet("{id}")]
    public ActionResult<ShiftDto> GetShiftById(Guid id)
    {
        var shift = _manager.GetShiftById(id);

        if (shift == null)
        {
            return NotFound(); 
        }

        return Ok(new ShiftDto()
        {
            Id = shift.Id,
            Start = shift.Start,
            End = shift.End,
            Name = shift.Name
        }); 
    }
    
    
    [HttpPost]
    public ActionResult<AddShiftDto> AddPlanningPeriod(AddShiftDto addShiftDto)
    {
        var shift = _manager.AddShift(
            addShiftDto.Name,
            addShiftDto.Start,
            addShiftDto.End);

        return CreatedAtAction(
            nameof(GetShiftById),
            new { id = shift.Id },
            shift);
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<ShiftDto>> GetAllShifts()
    {
        var shifts = _manager.GetAllShifts();
        return Ok(shifts.Select(p => new ShiftDto()
        {
            Id = p.Id,
            Start = p.Start,
            End = p.End,
            Name = p.Name
        }));
    }
    
}