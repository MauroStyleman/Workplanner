import axios from "axios";
import {userData} from "../model/User.ts";


export const createUser = (newUser: userData) => {
    return axios.post('http://localhost:5077/api/User', newUser, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const fetchUsers = async () => {
    const response = await axios.get(`http://localhost:5077/api/User`);
    return response.data;
}