import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface RewardAttributes {
    id: number;
    name: string;
    description: string;
    points_cost: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

type RewardCreationAttributes = Optional<RewardAttributes, 'id' | 'description' | 'active' | 'created_at' | 'updated_at'>;

export class Reward extends Model<RewardAttributes, RewardCreationAttributes> implements RewardAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public points_cost!: number;
    public active!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Reward.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        points_cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'rewards',
        modelName: 'reward',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);