
// services/vehicle/vehicleExpense.ts
/*import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export interface VehicleExpense {
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

/*export interface Refuel {
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
};*/

/*import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

export interface VehicleExpense {
    vehicle_id: number;
    vehicle_name: string;
    refuels_data: {
        refuel: number;
        date: string;
        price: number;
    }[];
    maintenances_data: {
        maintenance: number;
        date: string;
        price: number;
    }[];
    replacements_data: {
        replacement: number;
        date: string;
        price: number;
    }[];
    expenses: {
        total_refuels: number;
        total_maintenances: number;
        total_replacements: number;
        total: number;
    };
}


// Função para buscar todas as despesas dos veículos
export const getVehicleExpenses = async (): Promise<VehicleExpense[]> => {
    try {
        const response = await axios.get<VehicleExpense[]>(`${API_URL}expense/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas dos veículos', error);
        throw error;
    }
};

// Função para buscar as despesas de um veículo específico pelo ID
export const getVehicleExpensesById = async (id: number): Promise<VehicleExpense> => {
    try {
        const response = await axios.get<VehicleExpense>(`${API_URL}expense/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas do veículo', error);
        throw error;
    }
};
*/

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

export interface VehicleExpenseResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: VehicleExpense[];
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

/*export const getVehicleExpenses = async (): Promise<VehicleExpense[]> => {
    try {
        const response = await axios.get<VehicleExpenseResponse>(`${API_URL}expense/`);
        return response.data.results; // Retorne apenas os resultados
    } catch (error) {
        console.error('Error fetching vehicles', error);
        throw error;
    }
};*/

export const getVehicleExpensesById = async (id: number): Promise<VehicleExpense[]> => {
    try {
        const response = await axios.get<VehicleExpense[]>(`${API_URL}expense/${id}/`);
        return response.data; // Retorna um array
    } catch (error) {
        console.error('Erro ao buscar despesas do veículo', error);
        throw error;
    }
};
  
  
/*export const getVehicleExpensesById = async (id: number): Promise<VehicleExpense> => {
    try {
        const response = await axios.get<VehicleExpense>(`${API_URL}expense/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas do veículo', error);
        throw error;
    }
};*/




  