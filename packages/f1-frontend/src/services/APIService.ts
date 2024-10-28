import axios, { AxiosInstance } from 'axios';

class APIService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:10000', // Replace with your backend base URL
        });
    }

    // GET request wrapper
    async get<T>(url: string, params = {}): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, { params });
        return response.data;
    }

    // TODO: add more methods like POST, PUT, DELETE
}

export const API = new APIService();