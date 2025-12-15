import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TimeSlotAttributes {
    id: number;
    slot_date: string;//yyyy-mm-dd
    start_time: string; //hh:mm:ss
    is_booked: boolean;
    created_at: Date;
    updated_at: Date;
}

type TimeSlotCreationAttributes = Optional<TimeSlotAttributes, 'id' | 'created_at' | 'updated_at' | 'is_booked'>;

export class TimeSlot extends Model<TimeSlotAttributes, TimeSlotCreationAttributes>
    implements TimeSlotAttributes {
    public id!: number;
    public slot_date!: string;
    public start_time!: string;
    public is_booked!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

TimeSlot.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        slot_date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        start_time:{
            type:DataTypes.TIME,
            allowNull:false
        },
        is_booked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
        tableName:'time_slots',
        modelName: 'time_slot',
        timestamps:true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        //Esto asegura que no se creen duplicados de fecha+hora a nivel base de datos
        indexes:[
            {
                unique:true,
                fields:['slot_date', 'start_time']
            }
        ]
    }
);
