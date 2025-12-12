import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ServiceAttributes {
    id: number,
    name: string,
    description: string | null,
    price: number,
    duration_minutes: number,
    points_reward: number,
    active: boolean,
    created_at: Date,
    updated_at: Date,
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'created_at' | 'updated_at' | 'duration_minutes' | 'points_reward' | 'active'>{}

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes>
    implements ServiceAttributes {
    public id!: number;
    public name!: string;
    public description!: string | null;
    public price!: number;
    public duration_minutes!: number;
    public points_reward!: number;
    public active!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Service.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        description:{
            type:DataTypes.STRING(500),
            allowNull:true
        },
        price:{
            // Nota: Sequelize a veces devuelve DECIMAL como string para mantener precisión.
            // Si hay que operar matemáticamente, hay que parsearlo en el frontend o backend.
            type:DataTypes.DECIMAL(10, 2),
            allowNull:false
        },
        duration_minutes:{
            type:DataTypes.INTEGER,
            defaultValue:60
        },
        points_reward:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        },
        updated_at:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName:'services',
        modelName:'service',
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

