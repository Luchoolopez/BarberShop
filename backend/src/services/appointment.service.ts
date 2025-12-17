import { Appointment, AppointmentStatus } from "../models/appointment.model";
import { Service } from "../models/service.model";
import { TimeSlot } from "../models/time-slot.model";
import { TimeSlotService } from "./time-slot.service";
import { CreateAppointmentType } from "../validations/appointment.schema";
import { User } from "../models/user.model";

export class AppointmentService {
    private timeSlotService: TimeSlotService;

    constructor() {
        this.timeSlotService = new TimeSlotService();
    }

    async createAppointment(userId: number, data: CreateAppointmentType) {
        const { service_id, time_slot_id } = data;

        const service = await Service.findByPk(service_id);
        if (!service || !service.active) {
            throw new Error('Servicio no encontrado o inactivo');
        }

        await this.timeSlotService.markSlotAsBooked(time_slot_id);
        try {
            const appointment = await Appointment.create({
                user_id: userId,
                service_id: service_id,
                time_slot_id: time_slot_id,
                status: AppointmentStatus.CONFIRMED,
                recorded_price: service.price
            });
            return appointment
        } catch (error) {
            await this.timeSlotService.releaseSlot(time_slot_id);
            throw error;
        }   
    }

    async cancelAppointment(appointmentId:number, userId:number, isAdmin:boolean = false){
        const appointment = await Appointment.findByPk(appointmentId);

        if(!appointment){
            throw new Error('Turno no encontrado');
        }

        if(appointment.user_id !== userId && !isAdmin){
            throw new Error('No tienes permiso para cancelar este turno');
        }

        if(appointment.status === AppointmentStatus.CANCELLED){
            throw new Error('El turno ya esta cancelado');
        }

        if(appointment.status === AppointmentStatus.COMPLETED){
            throw new Error('No se puede cancelar un turno ya completado');
        }

        appointment.status = AppointmentStatus.CANCELLED;
        appointment.cancellation_reason = 'Cancelado por el usuario';
        await appointment.save();

        await this.timeSlotService.releaseSlot(appointment.time_slot_id);

        return appointment;
    }

    async getAppointmentByUser(userId:number){
        return await Appointment.findAll({
            where:{user_id: userId},
            include:[
                {
                    model:Service,
                    as:'service',
                    attributes:['name', 'price', 'duration_minutes']
                },
                {
                    model:TimeSlot,
                    as:'time_slot',
                    attributes:['slot_date', 'start_time']
                }
            ],
            order:[['created_at', 'DESC']]
        });
    }

    async getAppointmentByDate(date:string){
        return await Appointment.findAll({
            include:[
                {
                    model:TimeSlot,
                    as:'time_slot',
                    where:{slot_date:date},
                    attributes:['start_time']
                },
                {
                    model:User,
                    as:'client',
                    attributes:['name', 'duration_minutes', 'price']
                }
            ],
            order:[[
                {
                    model:TimeSlot, as:'time_slot'
                }, 
                'start_time', 'ASC'
            ]]
        })
    }

    async getAllAppointments(limit: number = 50) {
        return await Appointment.findAll({
            limit: limit,
            include: [
                { model: TimeSlot, as: 'time_slot' },
                { model: User, as: 'client', attributes: ['name', 'email'] },
                { model: Service, as: 'service', attributes: ['name'] }
            ],
            order: [['created_at', 'DESC']] 
        });
    }
}