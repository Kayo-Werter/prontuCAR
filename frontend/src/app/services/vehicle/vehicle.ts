// services/vehicle.ts
import axios from 'axios';


const API_URL = 'http://localhost:8000/api/v1/';

export interface Vehicle {
    id? : number;
    automobile: string;
    name: string;
    plate?: string;
    file?: string;
    buy_day?: string;
}

export interface VehicleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Vehicle[];
}



export const createVehicle = async (data: FormData) => {
    try {
        const response = await axios.post(`${API_URL}vehicle/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating vehicle', error);
        throw error;
    }
};


export const getVehicles = async () => {
    try {
        const response = await axios.get<VehicleResponse>(`${API_URL}vehicle/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles', error);
        throw error;
    }
};


export const getVehicleById = async (id: number) => {
    try {
        const response = await axios.get<Vehicle>(`${API_URL}vehicle/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle', error);
        throw error;
    }
};

export const updateVehicle = async (id: number, data: Partial<Vehicle>) => {
    try {
        const response = await axios.put(`${API_URL}vehicle/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle', error);
        throw error;
    }
};

export const deleteVehicle = async (id: number) => {
    try {
        await axios.delete(`${API_URL}vehicle/${id}/`);
    } catch (error) {
        console.error('Error deleting vehicle', error);
        throw error;
    }
};

// services/vehicle.ts
/*import axiosInstance from "../axiosConfig";

export interface Vehicle {
    id? : number;
    automobile: string;
    name: string;
    plate?: string;
    file?: string;
    buy_day?: string;
}

export interface VehicleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Vehicle[];
}



export const createVehicle = async (data: FormData) => {
    try {
        const response = await axiosInstance.post(`vehicle/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating vehicle', error);
        throw error;
    }
};


export const getVehicles = async () => {
    try {
        const response = await axiosInstance.get<VehicleResponse>(`vehicle/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles', error);
        throw error;
    }
};


export const getVehicleById = async (id: number) => {
    try {
        const response = await axiosInstance.get<Vehicle>(`vehicle/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicle', error);
        throw error;
    }
};

export const updateVehicle = async (id: number, data: Partial<Vehicle>) => {
    try {
        const response = await axiosInstance.put(`vehicle/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle', error);
        throw error;
    }
};

export const deleteVehicle = async (id: number) => {
    try {
        await axiosInstance.delete(`vehicle/${id}/`);
    } catch (error) {
        console.error('Error deleting vehicle', error);
        throw error;
    }
};*/


