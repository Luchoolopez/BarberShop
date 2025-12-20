import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { authService } from '../services/auth.service';
// Importamos User explícitamente
import type { LoginDTO, RegisterDTO, AuthResponse, User } from '../types/auth.types';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (values: LoginDTO) => Promise<void>;
    register: (values: RegisterDTO) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [initializing, setInitializing] = useState(true);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const accessToken = localStorage.getItem('accessToken');

                if (storedUser && accessToken) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error(e);
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
            } finally {
                setInitializing(false);
            }
        };
        initAuth();
    }, []);

    const handleLogin = async (values: LoginDTO) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(values);
            
            const { user, token } = response.data; 

            setUser(user);
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', token); 
            
            closeAuthModal?.();
        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al iniciar sesión";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (values: RegisterDTO) => {
        setLoading(true);
        setError(null);
        try {
            await authService.register(values);
            closeAuthModal();
        } catch (err: any) {
            const msg = err.response?.data?.message || "Error al registrarse";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    if (initializing) return null;

    const value = {
        isAuthenticated: !!user,
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        loading,
        error,
        setError,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
    }
    return context;
};