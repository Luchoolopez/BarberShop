import apiClient from "./apiClient";
import type { Reward, CreateRewardDTO, UserReward } from "../types/reward.types";

export const rewardService = {
    getActiveRewards: async (): Promise<Reward[]> => {
        const response = await apiClient.get<Reward[]>('/reward/active');
        return response.data; 
    },

    getMyRewards: async (): Promise<UserReward[]> => {
        const response = await apiClient.get<UserReward[]>('/reward/my-rewards');
        return response.data;
    },

    createReward: async (data: CreateRewardDTO): Promise<Reward> => {
        const response = await apiClient.post<Reward>('/reward', data);
        return response.data;
    },

    redeemReward: async (rewardId: number): Promise<UserReward> => {
        const response = await apiClient.post<UserReward>('/reward/redeem', { rewardId });
        return response.data;
    },

    updateReward: async (id: number, data: Partial<CreateRewardDTO>): Promise<Reward> => {
        const response = await apiClient.put<Reward>(`/reward/${id}`, data);
        return response.data;
    },

    deleteReward: async (id: number): Promise<void> => {
        await apiClient.delete(`/rewards/${id}`);
    },
    
    markAsUsed: async (userRewardId: number): Promise<UserReward> => {
        const response = await apiClient.patch<UserReward>(`/rewards/redeem/${userRewardId}/use`);
        return response.data;
    }
};