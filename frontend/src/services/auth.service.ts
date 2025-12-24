import apiClient from "./apiClient";
import type { ApiResponse, AuthResponse, LoginDTO, PaginatedUsersData, RegisterDTO, User } from "../types/auth.types";

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

    register: async (data: RegisterDTO): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.post<AuthResponse['data']['user']>('/user/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    checkAuth: async (): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.get<AuthResponse>('/user/me');
        return response.data.data.user;
    },

    getUser: async (id: number): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.get<AuthResponse>(`/user/${id}`);
        return response.data.data.user;
    },

    getUsers: async (page: number = 1, limit: number = 10): Promise<PaginatedUsersData> => {
        const response = await apiClient.get<ApiResponse<PaginatedUsersData>>('/user', {
            params: { page, limit }
        });
        return response.data.data;
    },

    // AGREGAR: Para obtener un usuario con sus premios (detalle)
    getUserDetail: async (id: number): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>(`/user/${id}`);
        return response.data.data;
    },

    promoteToAdmin: async (id: number): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.put<AuthResponse['data']['user']>(`/user/promote/${id}`);
        return response.data;
    },

    updateUser: async (id: number, data: Partial<RegisterDTO>): Promise<AuthResponse['data']['user']> => {
        const response = await apiClient.put<AuthResponse['data']['user']>(`/user/${id}`, data);
        return response.data;
    }
}