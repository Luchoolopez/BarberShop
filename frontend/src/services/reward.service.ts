import apiClient from "./apiClient";
import type { Reward, CreateRewardDTO, UserReward } from "../types/reward.types";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export const rewardService = {
    getActiveRewards: async (): Promise<Reward[]> => {
        const response = await apiClient.get<ApiResponse<Reward[]>>('/reward');
        return response.data.data; 
    },

    getMyRewards: async (): Promise<UserReward[]> => {
        const response = await apiClient.get<ApiResponse<UserReward[]>>('/reward/my-rewards');
        return response.data.data;
    },

    createReward: async (data: CreateRewardDTO): Promise<Reward> => {
        const response = await apiClient.post<ApiResponse<Reward>>('/reward/create', data);
        return response.data.data;
    },

    redeemReward: async (rewardId: number): Promise<UserReward> => {
        const response = await apiClient.post<ApiResponse<UserReward>>('/reward/redeem', { reward_id:rewardId });
        return response.data.data;
    },

    updateReward: async (id: number, data: Partial<CreateRewardDTO>): Promise<Reward> => {
        const response = await apiClient.put<ApiResponse<Reward>>(`/reward/${id}`, data);
        return response.data.data;
    },

    deleteReward: async (id: number): Promise<void> => {
        await apiClient.delete(`/reward/${id}`);
    },
    
    markAsUsed: async (userRewardId: number): Promise<void> => {
        const response = await apiClient.put<ApiResponse<any>>(`/reward/use/${userRewardId}`);
    }
};