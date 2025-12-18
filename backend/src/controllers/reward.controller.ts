import { Request, Response } from "express";
import { RewardService } from "../services/reward.service";

interface AuthRequest extends Request {
    user?: {
        id: number,
        role: string
    }
}

export class RewardController {
    private rewardService: RewardService;
    constructor() {
        this.rewardService = new RewardService();
    }

    createReward = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const reward = await this.rewardService.createReward(data);
            return res.status(201).json({
                success: true,
                message: 'Premio creado exitosamente',
                data: data
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    redeemReward = async (req: Request, res: Response) => {
        try {


            const { reward_id } = req.body;

            if (!reward_id || isNaN(Number(reward_id))) {
                return res.status(400).json({
                    success: false,
                    message: 'El reward_id es invalido'
                });
            }

            const userId = (req as AuthRequest).user?.id
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Usuario no autenticado' })
            }

            const redeemedReward = await this.rewardService.redeemReward(userId, Number(reward_id));

            return res.status(200).json({
                success: true,
                message: 'Premio canjeado exitosamente',
                data: redeemedReward
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getUserRewards = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthRequest).user?.id
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                })
            }
            const rewardsHistory = await this.rewardService.getUserRewards(userId);
            return res.status(200).json({
                success: true,
                count: rewardsHistory.length,
                data: rewardsHistory
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getAvailableRewards = async (req: Request, res: Response) => {
        try {
            const rewards = await this.rewardService.getActiveRewards();
            return res.status(200).json({
                success: true,
                count: rewards.length,
                data: rewards
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    updateReward = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedReward = await this.rewardService.updateReward(Number(id), req.body);
            return res.status(200).json({
                success: true,
                message: 'Premio actualizado',
                data: updatedReward
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    deleteReward = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.rewardService.deleteReward(Number(id));
            return res.status(200).json({
                success: true,
                message: 'Premio eliminado correctamente'
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    markRewardUsed = async (req: Request, res: Response) => {
        try {
            const { userRewardId } = req.params;
            if (!userRewardId || isNaN(Number(userRewardId))) throw new Error("ID inválido");

            const result = await this.rewardService.markAsUsed(Number(userRewardId));
            return res.status(200).json({
                success: true,
                message: 'Premio marcado como utilizado',
                data: result
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}