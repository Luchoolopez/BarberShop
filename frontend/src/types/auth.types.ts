// --- LO QUE YA TENÍAS (MANTENER IGUAL) ---
export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'client';
    phone?: string;
    points_balance?: number;
    // NUEVO: Agregamos esto opcional para cuando pidas el detalle
    redeemedRewards?: UserReward[]; 
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    }
}

export interface LoginDTO {
    email: string,
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
}


export interface Reward {
    id: number;
    name: string;
    points_cost: number;
    description?: string;
}

export interface UserReward {
    id: number;
    is_used: boolean;
    used_at: string | null;
    created_at: string;
    reward: Reward;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedUsersData {
    users: User[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}