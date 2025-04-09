import axios from "axios";
import {AddPlanningShiftDto} from "../model/PlanningShift.ts";

export const createPlanningShift = (newPlanningshift: AddPlanningShiftDto) => {
    return axios.post('http://localhost:5077/api/PlanningShift/add', newPlanningshift, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
