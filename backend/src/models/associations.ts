import { User } from "./user.model";
import { Service } from "./service.model";
import { Appointment } from "./appointment.model";
import { TimeSlot } from "./time-slot.model";

export const setupAssociations = () => {
    //un usuario puede tener muchos turnos
    User.hasMany(Appointment, {foreignKey: 'user_id', as: 'appointments'});
    //un turno pertenece a un usuario
    Appointment.belongsTo(User, {foreignKey:'user_id', as:'client'});

    //un servicio puede estar en muchos turnos
    Service.hasMany(Appointment, {foreignKey:'service_id', as:'appointments'});
    //un turno tiene un servicio espefico
    Appointment.belongsTo(Service, {foreignKey:'service_id', as:'service'});

    //un bloque de tiempo tiene un solo turno asociado
    TimeSlot.hasOne(Appointment, {foreignKey:'time_slot_id', as:'appointment'});
    //un turno pertenece a un bloque de tiempo 
    Appointment.belongsTo(TimeSlot, {foreignKey:'time_slot_id', as:'time_slot'});
}