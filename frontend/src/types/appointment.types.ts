import type { Service } from "./service.types";
import type { TimeSlot } from "./time-slot.types";

export interface Appointment {
    id: number;
    status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    user_id: number;
    service_id: number;
    time_slot_id: number;
    recorded_price: number;
    cancellation_reason?: string;
    service?: Service;
    time_slot?: TimeSlot;
    client?: { name: string; email: string };
}

export interface CreateAppointmentDTO {
    time_slot_id: number;
    service_id: number;
}