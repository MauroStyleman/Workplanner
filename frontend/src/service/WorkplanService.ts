import {WorkplanData} from "../model/workplan.ts";
import axios from 'axios';

const BACKEND_URL: string = import.meta.env.VITE_B_URL;



export async function createWorkplan(newWorkplan: WorkplanData) {
    try {
        const response = await axios.post(`http://localhost:5077/api/PlanningPeriod`, newWorkplan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Workplan created successfully:', response.data);
    } catch (error) {
        console.error('Error creating workplan:', error);
        throw error;
    }
}
