/* Trazer as informações da minha api do back end */

import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export interface Refuel {
    vehicle: string;
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