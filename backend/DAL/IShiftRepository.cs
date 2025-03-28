﻿using Workplanner.Domain;

namespace Workplanner.DAL;

public interface IShiftRepository
{
    Shift? ReadShiftById(Guid id);
    
    void CreateShift(Shift shift);
    
    IEnumerable<Shift> ReadAllShifts();
    IQueryable<Shift> ReadAllShiftsThatDontExistYetOnPlanningShift(DateOnly selectedDate,Guid planningPeriodId);
}