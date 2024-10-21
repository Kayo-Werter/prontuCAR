
/*import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';


export interface Adress{
    cep: string;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
}

export interface User {
    email: string;
    username: string;
    password: string;
    adress: Adress;
}

export interface UserResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}


export const createUser = async (data: User) => {
    try {
        const response = await axios.post(`${API_URL}users/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário', error);
        throw error;
    }
};

export const getUser = async (): Promise<User[]> => {
    try {
        const response = await axios.get<UserResponse>(`${API_URL}users/`);
        console.log('Dados recebidos da API:', response.data); // Log para verificar os dados recebidos
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar Usuário', error);
        throw error;
    }
};

export const getUserById = async (id: number) => {
    try {
        const response = await axios.get<User>(`${API_URL}users/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Usuário', error);
        throw error;
    }
};

export const updateUser = async (id: number, data: Partial<User>) => {
    try {
        const response = await axios.put(`${API_URL}users/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Usuário', error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`${API_URL}users/${id}/`);
    } catch (error) {
        console.error('Erro ao excluir Usuário', error);
        throw error;
    }
};*/

import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/';

// Definindo a interface de Endereço
export interface Address {
    cep: string;
    street: string;
    number: string;  // Alterado para string para aceitar entradas como '123-A'
    neighborhood: string;
    city: string;
    state: string;
}


// Definindo a interface de Usuário
export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    address: Address;  // Corrigido o nome de 'adress' para 'address'
}

// Estrutura de resposta para múltiplos usuários
export interface UserResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}

// Função para criar um novo usuário
export const createUser = async (data: User) => {
    try {
        const response = await axios.post(`${API_URL}users/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário', error);
        throw error;
    }
};

// Função para buscar todos os usuários
export const getUser = async (): Promise<User[]> => {
    try {
        const response = await axios.get<UserResponse>(`${API_URL}users/`);
        console.log('Dados recebidos da API:', response.data); // Log para verificar os dados recebidos
        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar Usuário', error);
        throw error;
    }
};

// Função para buscar um usuário por ID
export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_URL}users/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Usuário', error);
        throw error;
    }
};

// Função para atualizar um usuário
export const updateUser = async (id: number, data: Partial<User>) => {
    try {
        const response = await axios.put(`${API_URL}users/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Usuário', error);
        throw error;
    }
};

// Função para excluir um usuário
export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`${API_URL}users/${id}/`);
    } catch (error) {
        console.error('Erro ao excluir Usuário', error);
        throw error;
    }
};
