import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { rewardService } from '../services/reward.service';
import type { User, PaginatedUsersData } from '../types/auth.types';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Omit<PaginatedUsersData, 'users'>>({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Cargar usuarios paginados
    const fetchUsers = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            const data = await authService.getUsers(page);
            setUsers(data.users);
            setPagination({
                totalItems: data.totalItems,
                totalPages: data.totalPages,
                currentPage: data.currentPage
            });
        } catch (err: any) {
            console.error(err);
            setError('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    }, []);

    // Ver detalle (incluye premios)
    const fetchUserDetail = async (id: number) => {
        try {
            const user = await authService.getUserDetail(id);
            setSelectedUser(user);
        } catch (err) {
            console.error(err);
        }
    };

    // Marcar premio como usado
    const markRewardAsUsed = async (userRewardId: number) => {
        try {
            await rewardService.markAsUsed(userRewardId);
            // Refrescar el modal si está abierto
            if (selectedUser) {
                await fetchUserDetail(selectedUser.id);
            }
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Error al canjear');
        }
    };

    // Promover admin
    const promoteUser = async (id: number) => {
        try {
            await authService.promoteToAdmin(id);
            fetchUsers(pagination.currentPage); // Recargar tabla
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, [fetchUsers]);

    return {
        users,
        pagination,
        loading,
        error,
        selectedUser,
        setSelectedUser,
        fetchUsers,
        fetchUserDetail,
        markRewardAsUsed,
        promoteUser
    };
};