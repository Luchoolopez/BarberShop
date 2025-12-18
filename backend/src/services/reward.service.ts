import { sequelize } from "../config/database";
import { Reward } from "../models/reward.model";
import { User } from "../models/user.model";
import { UserReward } from "../models/user-reward.model";
import { PointsHistory } from "../models/points-history.model";
import { CreateRewardType } from "../validations/reward.schema";

export class RewardService {
    async createReward(data: CreateRewardType) {
        return await Reward.create(data);
    }

    async getActiveRewards() {
        return await Reward.findAll({
            where: { active: true },
            order: [['points_cost', 'ASC']]
        });
    }

    async redeemReward(userId: number, rewardId: number) {
        const t = await sequelize.transaction();
        try {
            const reward = await Reward.findByPk(rewardId, { transaction: t });
            if (!reward || !reward.active) {
                throw new Error('El premio no existe o no esta activo');
            }

            const user = await User.findByPk(userId, { transaction: t });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            if (user.points_balance < reward.points_cost) {
                throw new Error(`Puntos insuficientes. Tenes ${user.points_balance} y necesitas ${reward.points_cost}`);
            }

            await user.decrement('points_balance', {
                by: reward.points_cost,
                transaction: t
            });

            await PointsHistory.create({
                user_id: userId,
                amount: -reward.points_cost,
                description: `Canje de premio: ${reward.name}`
            }, { transaction: t });

            const userReward = await UserReward.create({
                user_id: userId,
                reward_id: reward.id,
                is_used: false,
                used_at: null
            }, { transaction: t });

            await t.commit();
            return userReward;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async getUserRewards(userId: number) {
        return await UserReward.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Reward
                }
            ],
            order: [['created_at', 'DESC']]
        });
    }

    async updateReward(id: number, data: Partial<CreateRewardType>) {
        const reward = await Reward.findByPk(id);
        if (!reward) {
            throw new Error('Premio no encontrado');
        }
        return await reward.update(data);
    }

    async deleteReward(id: number) {
        const reward = await Reward.findByPk(id);
        if (!reward) {
            throw new Error('Premio no encontrado');
        }
        reward.active = false;
        return await reward.save();
    }

    async markAsUsed(userRewardId:number){
        const userReward = await UserReward.findByPk(userRewardId);
        if(!userReward){
            throw new Error('El canje no existe');
        }
        if(userReward.is_used){
            throw new Error('Este premio ya fue utilizado anteriormente');
        }

        userReward.is_used = true;
        userReward.used_at = new Date();

        return await userReward.save();
    }
}