import type { Service } from "./service.types";
import type{ TimeSlot } from "./time-slot.types";
import type{ User } from "./auth.types"; 

export interface Appointment {
    id: number;
    status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    service_id: number;
    time_slot_id: number;
    user_id: number;
    service?: Service;
    time_slot?: TimeSlot;
    client?: { name: string; email: string }; 
}

export interface CreateAppointmentDTO {
    service_id: number;
    time_slot_id: number;
}