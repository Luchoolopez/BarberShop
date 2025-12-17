import {z} from 'zod';

export const createRewardSchema = z.object({
    body: z.object({
        name:z.string().min(3),
        description: z.string().optional(),
        points_cost: z.number().int().positive(),
        active:z.boolean().optional()
    })
});

export const redeemRewardSchema = z.object({
    body:z.object({
        reward_id: z.number().int().positive()
    })
});

export type CreateRewardType = z.infer<typeof createRewardSchema>['body'];
export type RedeemRewardType = z.infer<typeof redeemRewardSchema>['body'];