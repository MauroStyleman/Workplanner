import {WorkplanData} from "../model/workplan.ts";
import axios from 'axios';


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
