import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface AdminAttributes {
    id: number,
    email: string,
    password: string,
    created_at: Date,
    updated_at: Date,
}

type AdminCreationAttributes = Omit<AdminAttributes, 'id' | 'created_at' | 'updated_at'>;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes>
    implements AdminAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        tableName: 'admins',
        modelName: 'admin',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);