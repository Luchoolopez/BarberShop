import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
    id: number,
    name: string,
    email: string,
    password: string,
    phone:string,
    role: 'admin' | 'client',
    created_at: Date,
    updated_at: Date,
}

type UserCreationAttributes = Omit<UserAttributes, 'id' | 'created_at' | 'updated_at'>;

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public role!: 'admin' | 'client';
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING(25),
            allowNull:false
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
        phone:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        role:{
            type:DataTypes.ENUM('admin', 'client'),
            allowNull:false,
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