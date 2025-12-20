export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'client';
    phone?: string;
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