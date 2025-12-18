import { User } from "./user.model";
import { Service } from "./service.model";
import { Appointment } from "./appointment.model";
import { TimeSlot } from "./time-slot.model";
import { PointsHistory } from "./points-history.model";
import { Reward } from "./reward.model";
import { UserReward } from "./user-reward.model";


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

    User.hasMany(PointsHistory, {foreignKey:'user_id', as:'history'});
    PointsHistory.belongsTo(User, {foreignKey:'user_id'});


    User.hasMany(UserReward, { foreignKey: 'user_id', as: 'redeemedRewards' });
    UserReward.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    // 3. Un Premio puede ser canjeado muchas veces
    Reward.hasMany(UserReward, { foreignKey: 'reward_id', as: 'redemptions' });
    UserReward.belongsTo(Reward, { foreignKey: 'reward_id', as: 'reward' });
}