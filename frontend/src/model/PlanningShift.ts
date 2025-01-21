import {Shift} from "./Shift.ts";

export type PlanningShift = {
    id: string;
    date: string;
    planningPeriodId: string;
    shift: Shift;
};

export type PlanningShiftData = Omit<PlanningShift, 'id'>;
