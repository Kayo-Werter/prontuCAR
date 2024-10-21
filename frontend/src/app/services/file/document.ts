// services/document.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export interface Document {
    id? : number;
    name: string;
    description: string;
    upload_date: Date;
    file: File;
    
}

export interface DocumentResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Document[];
}
  

export const createDocument = async (data: Document) => {
    try {
        const response = await axios.post(`${API_URL}document/`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating document', error);
        throw error;
    }
};

export const getDocuments = async () => {
    try {
        const response = await axios.get<DocumentResponse>(`${API_URL}document/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching document', error);
        throw error;
    }
};

export const getDocumentById = async (id: number) => {
    try {
        const response = await axios.get<Document>(`${API_URL}document/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching document', error);
        throw error;
    }
};

export const updateDocument = async (id: number, data: Partial<Document>) => {
    try {
        const response = await axios.put(`${API_URL}document/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating document', error);
        throw error;
    }
};

export const deleteDocument = async (id: number) => {
    try {
        await axios.delete(`${API_URL}document/${id}/`);
    } catch (error) {
        console.error('Error deleting document', error);
        throw error;
    }
};
