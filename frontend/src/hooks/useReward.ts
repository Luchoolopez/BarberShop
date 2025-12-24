import { useState, useEffect, useCallback } from 'react';
import { rewardService } from '../services/reward.service';
import type { Reward } from '../types/reward.types';

export const useRewards = () => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRewards = useCallback(async () => {
        setLoading(true);
        try {
            const data = await rewardService.getActiveRewards();
            setRewards(data);
            setError(null);
        } catch (e) {
            setError("Error al cargar los premios");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRewards(); }, [fetchRewards]);

    const createReward = async (data: any) => {
        await rewardService.createReward(data);
        fetchRewards();
    };

    const updateReward = async (id: number, data: any) => {
        await rewardService.updateReward(id, data);
        fetchRewards();
    };

    const deleteReward = async (id: number) => {
        await rewardService.deleteReward(id);
        fetchRewards();
    };

    return { rewards, loading, error, createReward, updateReward, deleteReward };
};