import apiClient from "./apiClient";
import type{ AuthResponse, LoginDTO, RegisterDTO } from "../types/auth.types";

export const authService = {
    login:async(credentials:LoginDTO):Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/user/login', credentials);
        if(response.data.token){
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    register:async(data:RegisterDTO):Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/user/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    checkAuth:async():Promise<AuthResponse['user']> => {
        const response = await apiClient.get<AuthResponse['user']>('/auth/me');
        return response.data;
    }
}