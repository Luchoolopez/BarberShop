import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../config/database";

interface PointsHistoryAttributes {
    id: number;
    user_id: number;
    amount: number;
    description: string;
    created_at: Date;
}

type PointsHistoryCreationAttributes = Optional<PointsHistoryAttributes, 'id' | 'created_at'>;

export class PointsHistory extends Model<PointsHistoryAttributes, PointsHistoryCreationAttributes>
    implements PointsHistoryAttributes {
    public id!: number;
    public user_id!: number;
    public amount!: number;
    public description!: string;
    public readonly created_at!: Date;
}

PointsHistory.init(
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
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: 'points_history',
        modelName: 'points_history',
        timestamps: false
    }
);