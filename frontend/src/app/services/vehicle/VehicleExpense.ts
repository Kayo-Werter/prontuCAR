
// services/vehicle/VehicleExpense.ts

import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export interface Expense{
    total_refuels: string;
    total_maintenances: string;
    total_replacements: string;
    total: string;
}
export interface VehicleExpense {
    vehicle_id: number;
    vehicle_name: string;
    expenses?: Expense;
}

export const getVehicleExpenses = async (): Promise<VehicleExpense[]> => {
    try {
        const response = await axios.get<VehicleExpense[]>(`${API_URL}expense/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas dos veículos', error);
        throw error;
    }
};



export const getVehicleExpensesById = async (id: number): Promise<VehicleExpense | null> => {
    try {
        const response = await axios.get<VehicleExpense[]>(`${API_URL}expense/${id}/`);
        return response.data.length > 0 ? response.data[0] : null; // Retorna o primeiro objeto ou null
    } catch (error) {
        console.error('Erro ao buscar despesas do veículo', error);
        throw error;
    }
};



  