import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export enum AppointmentStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
};

interface AppointmentAtributes {
    id: number;
    user_id: number;
    time_slot_id: number;
    service_id: number;
    status: AppointmentStatus;
    recorded_price: number;
    cancellation_reason?: string;
    created_at: Date;
    updated_at: Date;
}

type AppointmentCreationAttributes = Optional<AppointmentAtributes, 'id' | 'status' | 'cancellation_reason' | 'created_at' | 'updated_at'>;

export class Appointment extends Model<AppointmentAtributes, AppointmentCreationAttributes>
    implements AppointmentAtributes {
    public id!: number;
    public user_id!: number;
    public time_slot_id!: number;
    public service_id!: number;
    public status!: AppointmentStatus;
    public recorded_price!: number;
    public cancellation_reason?: string | undefined;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Appointment.init(
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
        time_slot_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
            defaultValue: AppointmentStatus.CONFIRMED,
            allowNull: false
        },
        recorded_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        cancellation_reason: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'appointments',
        modelName: 'appointment',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);