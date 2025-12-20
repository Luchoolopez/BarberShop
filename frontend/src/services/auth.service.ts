import apiClient from "./apiClient";
import type { AuthResponse, LoginDTO, RegisterDTO } from "../types/auth.types";

export const authService = {
    login: async (credentials: LoginDTO): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/user/login', credentials);
        
        const { token, user } = response.data.data;

        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        
        return response.data;
    },

    register: async (data: RegisterDTO): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/user/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    checkAuth: async (): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.get<AuthResponse>('/auth/me');
        return response.data.data.user;
    }
}