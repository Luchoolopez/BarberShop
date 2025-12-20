export interface ClientInfo {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

export interface ServiceInfo {
    id: number;
    name: string;
    price: string;
}

export interface AppointmentInfo {
    id: number;
    status: string; 
    client?: ClientInfo;
    service?: ServiceInfo;
}

export interface TimeSlot {
    id: number;
    slot_date: string;  
    start_time: string; 
    is_booked: boolean;
    created_at: string;
    updated_at: string;
    
    appointment?: AppointmentInfo | null;
}

export interface GenerateTimeSlotDTO {
    date: string;
    open_time: string;
    close_time: string;
    interval_minutes: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}