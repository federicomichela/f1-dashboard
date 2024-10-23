class APIService {
    private baseURL: string;

    constructor() {
        this.baseURL = 'http://localhost:10000'; // Replace with your backend base URL
    }

    // Helper method to handle response and errors
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        return response.json() as Promise<T>;
    }

    // GET request wrapper
    async get<T>(url: string, params: Record<string, string> = {}): Promise<T> {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${this.baseURL}${url}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return this.handleResponse<T>(response);
    }

    // TODO: add more methods like POST, PUT, DELETE
}

export const API = new APIService();