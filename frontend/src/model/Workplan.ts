import {PlanningShift} from "./PlanningShift.ts";

export type Workplan = {
    id: string;
    name: string;
    start: string;
    end: string;
    planningShifts: PlanningShift[];
};

export type WorkplanData = Omit<Workplan, 'id'>;