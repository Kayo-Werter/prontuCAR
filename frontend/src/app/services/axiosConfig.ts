import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';

// Crie uma instância do axios
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Interceptor para adicionar o token de autenticação
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assumindo que você salva o token no localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
