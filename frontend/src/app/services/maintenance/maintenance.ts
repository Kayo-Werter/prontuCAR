/* Trazer as informações da minha api do back end */

import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export interface Maintenance {
    vehicle: string;
    value: number;
    description: string;
    local: string;
    maintenance_date: Date;
}

export interface MaintenanceResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: Maintenance[];
}


export const createMaintenance = async (data: Maintenance) => {
    try {
        const response = await axios.post(`${API_URL}maintenance/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar manutenção', error);
        throw error;
    }
};