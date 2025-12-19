import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import type { LoginDTO, RegisterDTO, AuthResponse } from "../types/auth.types";
import { authService } from "../services/auth.service";

interface ApiError {
    message: string;
    error?: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
        setLoading(true);
        setError(null);
        try {
            const reponse = await authService.login(credentials);
            navigate('/');
            return reponse;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const errorData = error.response?.data as ApiError;
                const errorMessage = errorData?.message || errorData?.error || 'Error al iniciar sesion';
                setError(errorMessage);
            } else {
                setError('Ocurrio un error inesperado')
            }
            throw error;

        } finally {
            setLoading(false);
        }
    }

    const register = async (data: RegisterDTO) => {
        setLoading(true);
        setError(null);
        try {
            await authService.register(data);
            navigate('/login');
        } catch (error:any) {
            if (error instanceof AxiosError) {
                const errorData = error.response?.data as ApiError;
                setError(errorData?.message || "Error al registrarse");
            } else {
                setError('Error de conexion');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        navigate('/login');
    };

    return{
        login,
        register,
        logout,
        loading,
        error,
        setError
    };
};
