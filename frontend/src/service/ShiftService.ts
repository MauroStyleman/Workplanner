import axios from "axios";
import {ShiftData} from "../model/Shift.ts";

export const createShift = (newShift: ShiftData) => {
    return axios.post('http://localhost:5077/api/Shift', newShift, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const fetchShifts = async () => {
    const response = await axios.get(`http://localhost:5077/api/Shift`);
    return response.data;
}
