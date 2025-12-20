import { TimeSlot } from "../models/time-slot.model";
import { GenerateTimeSlotType } from "../validations/time-slot.schema";
import { Appointment } from "../models/appointment.model";
import { User } from "../models/user.model";
import { Service } from "../models/service.model";

export class TimeSlotService{
    private timeToMinutes(timeStr:string): number {
        //"09:30 => 570, Cuenta desde las 00:00"
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    private minutesToTime(totalMinutes:number):string{
        //570 => "09:30:00"
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`
    }

    async generateDailySlots(data:GenerateTimeSlotType):Promise<TimeSlot[]>{
        const {date, open_time, close_time, interval_minutes} = data;
        const startMinutes = this.timeToMinutes(open_time);
        const endMinutes = this.timeToMinutes(close_time);
        
        const slotsToCreate = [];

        for(let current = startMinutes; current < endMinutes; current += interval_minutes){
            const timeString = this.minutesToTime(current);
            slotsToCreate.push({
                slot_date:date,
                start_time:timeString,
                is_booked:false
            });
        }

        const createdSlots = await TimeSlot.bulkCreate(slotsToCreate, {
            ignoreDuplicates:true
        });
        return createdSlots;
    }

    async getAvailableSlots(date:string):Promise<TimeSlot[]>{
        return await TimeSlot.findAll({
            where:{
                slot_date:date,
                is_booked:false
            },
            order:[['start_time', 'ASC']],
            raw:true,
            nest:true
        });
    }

    //borra slots de un dia, no borra los que ya estan reservados
    async clearSlotsByDate(date:string){
        return await TimeSlot.destroy({
            where:{
                slot_date:date,
                is_booked:false
            }
        });
    }

    async markSlotAsBooked(slotId:number):Promise<TimeSlot>{
        const slot = await TimeSlot.findByPk(slotId);
        if(!slot){
            throw new Error('El horario seleccionado ya no existe');
        }
        if(slot.is_booked){
            throw new Error('El horario ya fue reservado por otro cliente');
        }
        slot.is_booked = true;
        await slot.save();
        return slot;
    }

    async releaseSlot(slotId:number):Promise<TimeSlot>{
        const slot = await TimeSlot.findByPk(slotId);
        if(!slot){
            throw new Error('El horario ya no existe');
        }
        slot.is_booked = false;
        await slot.save();
        return slot;
    }

    async getAdminSlotsByDate(date: string): Promise<TimeSlot[]> {
        return await TimeSlot.findAll({
            where: {
                slot_date: date
            },
            include: [
                {
                    model: Appointment,
                    as: 'appointment', 
                    required: false,   
                    include: [
                        {
                            model: User,
                            as: 'client', 
                            attributes: ['id', 'name', 'email', 'phone']
                        },
                        {
                            model: Service,
                            as: 'service',
                            attributes: ['id', 'name', 'price']
                        }
                    ]
                }
            ],
            order: [['start_time', 'ASC']]
        });
    }
}