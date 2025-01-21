import axios from 'axios';
import {WorkplanData} from "../model/Workplan.ts";


export const createWorkplan = (newWorkplan: WorkplanData) => {
    return axios.post('http://localhost:5077/api/PlanningPeriod', newWorkplan, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};



export const fetchWorkplans = async () => {
   const response = await axios.get(`http://localhost:5077/api/PlanningPeriod`);
    return response.data;
}


export const fetchWorkplan = async (workplanId: string) => {
    const response = await axios.get(`http://localhost:5077/api/PlanningPeriod/withShift/${workplanId}`);
    return response.data;
}
