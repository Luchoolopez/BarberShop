import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/database";

interface userRewardAttributes {
    id: number;
    user_id: number;
    reward_id: number;
    is_used: boolean;
    used_at?: Date | null;
    created_at: Date;
}

type userRewardCreationAttributes = Optional<userRewardAttributes, 'id' | 'created_at' | 'used_at' | 'is_used'>;

export class UserReward extends Model<userRewardAttributes, userRewardCreationAttributes>
    implements userRewardAttributes {
    public id!: number;
    public user_id!: number;
    public reward_id!: number;
    public is_used!: boolean;
    public used_at!: Date | null;
    public readonly created_at!: Date;
}

UserReward.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reward_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        used_at:{
            type:DataTypes.DATE,
            allowNull:true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'user_rewards',
        modelName: 'user_reward',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt:false
    }
)