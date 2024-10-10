// services/vehicleExpense.ts
/*import { Refuel } from '../../services/refuel/refuel'; // Ajuste o caminho conforme necessário
import { Maintenance } from '../../services/maintenance/maintenance';
import { Replacement } from '../../services/replacement/replacement';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export interface VehicleExpenses {
    vehicle_id: number;            // ID do veículo
    vehicle_name: string;          // Nome do veículo
    expenses: number;              // Total de despesas
    refuels: Refuel[];            // Dados de reabastecimentos
    maintenances: Maintenance[];   // Dados de manutenções
    replacements: Replacement[];    // Dados de substituições
}


export const getVehicleExpenses = async (): Promise<VehicleExpenses[]> => {
    try {
        const response = await axios.get<VehicleExpenses[]>(`${API_URL}expense/`); // Use a rota correta
        return response.data; // Retorna os dados de despesas do veículo
    } catch (error) {
        console.error('Error fetching vehicle expenses', error);
        throw error;
    }
};
*/

// services/vehicle/vehicleExpense.ts
import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

/*export interface VehicleExpense {
    vehicle_id: number;
    vehicle_name: string;
    refuels: {
        refuel: number;
        date: string;
        price: number;
    }[];
    maintenances: {
        maintenance: number;
        date: string;
        price: number;
    }[];
    replacements: {
        replacement: number;
        date: string;
        price: number;
    }[];
    expenses?: number; // O total de despesas (opcional, pode ser calculado ou vindo do backend)
}*/

export interface Refuel {
    refuel: number;
    date: string;
    price: number;
}

export interface Maintenance {
    maintenance: number;
    date: string;
    price: number;
}

export interface Replacement {
    replacement: number;
    date: string;
    price: number;
}

export interface Refuel{
    refuel: number;
    date: string;
    price: number;
}

export interface VehicleExpense {
    vehicle_id: number;
    vehicle_name: string;
    expenses: number; // Total de despesas
    refuels_data: Refuel[];
    maintenances_data: Maintenance[];
    replacements: Replacement[];
    refuels: Refuel[];
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

export const getVehicleExpensesById = async (id: number): Promise<VehicleExpense> => {
    try {
        const response = await axios.get<VehicleExpense>(`${API_URL}expense/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas do veículo', error);
        throw error;
    }
};