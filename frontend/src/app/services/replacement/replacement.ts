import axios from 'axios';
import { Maintenance } from '../maintenance/maintenance';

const API_URL = 'http://localhost:8000/api/v1/';

/*export interface Replacement extends Maintenance {
    exchanged_part: string;
    value_part: number; // deve ser número
    replacement_day: string; // mantenha como string ou mude para Date se necessário
    id?: number;
    vahicle?: string; // se você precisar desse campo
}*/

export interface Replacement{
    id?: number;
    vehicle: string;
    exchanged_part: string;
    value_part: string;
    replacement_day: string;
    description: string;
    local: string;
    
}

export interface ReplacementResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: Replacement[];
}

export const createReplacement = async (data: Replacement) => {
    try {
        const response = await axios.post(`${API_URL}replacement/`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating replacement', error);
        throw error;
    }
};

export const getReplacements = async () => {
    try {
        const response = await axios.get<ReplacementResponse>(`${API_URL}replacement/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching replacement', error);
        throw error;
    }
};

export const getReplacementById = async (id: number) => {
    try {
        const response = await axios.get<Replacement>(`${API_URL}replacement/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching replacement', error);
        throw error;
    }
};

export const updateReplacement = async (id: number, data: Partial<Replacement>) => {
    try {
        const response = await axios.put(`${API_URL}replacement/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating replacement', error);
        throw error;
    }
};

export const deleteReplacement = async (id: number) => {
    try {
        await axios.delete(`${API_URL}replacement/${id}/`);
    } catch (error) {
        console.error('Error deleting replacement', error);
        throw error;
    }
};
