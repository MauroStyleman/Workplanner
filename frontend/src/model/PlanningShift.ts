import {Shift} from "./Shift.ts";

export type PlanningShift = {
    id: string;
    startDate: string;
    planningPeriodId: string;
    shift: Shift;
};

export type AddPlanningShiftDto= {
    date: string
    endDate: string | null
    isRecurring: boolean
    interval: number
    recurrenceType: string
    planningPeriodId: string,
    shiftId: string,
}

export type PlanningShiftData = Omit<PlanningShift, 'id'>;
