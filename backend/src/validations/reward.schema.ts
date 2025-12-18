import { z } from 'zod';

export const createRewardSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    points_cost: z.number().int().positive(),
    active: z.boolean().optional()
});

export const redeemRewardSchema = z.object({
    reward_id: z.number().int().positive()
});

export type CreateRewardType = z.infer<typeof createRewardSchema>;
export type RedeemRewardType = z.infer<typeof redeemRewardSchema>;