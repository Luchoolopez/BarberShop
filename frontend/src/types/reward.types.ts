export interface Reward {
    id: number;
    name: string;
    description: string;
    points_cost: number;
    active: boolean;
    stock?: number;
    created_at?: string;
    updated_at?: string;
}

export interface UserReward {
    id: number;
    user_id: number;
    reward_id: number;
    is_used: boolean;
    used_at: string | null;
    reward?: Reward; 
}

export interface CreateRewardDTO {
    name: string;
    description: string;
    points_cost: number;
    stock?: number;
}