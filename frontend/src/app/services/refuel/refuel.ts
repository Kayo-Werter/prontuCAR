/* Trazer as informações da minha api do back end */

import axios from "axios";
import { Vehicle } from "../vehicle/vehicle";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

export interface Refuel {
    id?: number;
    vehicle: string; //vehicle: Vehicle
    price_gasoline: number;
    value_total: number;
    liters_gasoline: number;
    refuel_date: string;
}

export interface RefuelResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: Refuel[];
}


export const newRefuel = async (data: Refuel) => {
    try {
        const response = await axios.post(`${API_URL}refuel/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar novo abastecimento', error);
        throw error;
    }
};

export const getRefuels = async (): Promise<Refuel[]> => {
    try {
        const response = await axios.get<RefuelResponse>(`${API_URL}refuel/`);
        console.log('Dados recebidos da API:', response.data); // Log para verificar os dados recebidos
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar abastecimentos', error);
        throw error;
    }
};

export const getRefuelById = async (id: number) => {
    try {
        const response = await axios.get<Refuel>(`${API_URL}refuel/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar abastecimento', error);
        throw error;
    }
};

export const updateRefuel = async (id: number, data: Partial<Refuel>) => {
    try {
        const response = await axios.put(`${API_URL}refuel/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar abastecimento', error);
        throw error;
    }
};

export const deleteRefuel = async (id: number) => {
    try {
        await axios.delete(`${API_URL}refuel/${id}/`);
    } catch (error) {
        console.error('Erro ao excluir abastecimento', error);
        throw error;
    }
};