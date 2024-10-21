/* Trazer as informações da minha api do back end */

import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1/';

export interface Maintenance {
    id?: number;
    vehicle: string; // string ou number
    value: number;
    description: string;
    local: string;
    maintenance_date: string; //maintenance_date: Date;
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

export const getMaintenance = async (): Promise<Maintenance[]> => {
    try {
        const response = await axios.get<MaintenanceResponse>(`${API_URL}maintenance/`);
        console.log('Dados recebidos da API:', response.data); // Log para verificar os dados recebidos
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar Manutenção', error);
        throw error;
    }
};

export const getMaintenanceById = async (id: number) => {
    try {
        const response = await axios.get<Maintenance>(`${API_URL}maintenance/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Manutenção', error);
        throw error;
    }
};

export const updateMaintenance = async (id: number, data: Partial<Maintenance>) => {
    try {
        const response = await axios.put(`${API_URL}maintenance/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Manutenção', error);
        throw error;
    }
};

export const deleteMaintenance = async (id: number) => {
    try {
        await axios.delete(`${API_URL}maintenance/${id}/`);
    } catch (error) {
        console.error('Erro ao excluir Manutenção', error);
        throw error;
    }
};

/*import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Supondo que você armazene o token aqui
};

export interface Maintenance {
    id?: number;
    vehicle: string; // string ou number
    value: number;
    description: string;
    local: string;
    maintenance_date: string; //maintenance_date: Date;
}

export interface MaintenanceResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Maintenance[];
}

export const createMaintenance = async (data: Maintenance) => {
    try {
        const response = await axios.post(`${API_URL}maintenance/`, data, {
            headers: { Authorization: `Bearer ${getAuthToken()}` } // Adicionando o token ao cabeçalho
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar manutenção', error);
        throw error;
    }
};

export const getMaintenance = async (): Promise<Maintenance[]> => {
    try {
        const response = await axios.get<MaintenanceResponse>(`${API_URL}maintenance/`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` } // Adicionando o token ao cabeçalho
        });
        console.log('Dados recebidos da API:', response.data); // Log para verificar os dados recebidos
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar Manutenção', error);
        throw error;
    }
};

export const getMaintenanceById = async (id: number) => {
    try {
        const response = await axios.get<Maintenance>(`${API_URL}maintenance/${id}/`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` } // Adicionando o token ao cabeçalho
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Manutenção', error);
        throw error;
    }
};

export const updateMaintenance = async (id: number, data: Partial<Maintenance>) => {
    try {
        const response = await axios.put(`${API_URL}maintenance/${id}/`, data, {
            headers: { Authorization: `Bearer ${getAuthToken()}` } // Adicionando o token ao cabeçalho
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Manutenção', error);
        throw error;
    }
};

export const deleteMaintenance = async (id: number) => {
    try {
        await axios.delete(`${API_URL}maintenance/${id}/`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` } // Adicionando o token ao cabeçalho
        });
    } catch (error) {
        console.error('Erro ao excluir Manutenção', error);
        throw error;
    }
};*/
