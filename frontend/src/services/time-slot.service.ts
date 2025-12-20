import apiClient from "./apiClient";
import type { TimeSlot, GenerateTimeSlotDTO, ApiResponse } from "../types/time-slot.types";

export const timeSlotService = {
    getSlotsByDate: async(date:string):Promise<TimeSlot[]> => {
        const response = await apiClient.get<ApiResponse<TimeSlot[]>>('timeSlots/', {
            params:{date}
        });
        return response.data.data;
    },

    getAdminSlotsByDate: async (date: string): Promise<TimeSlot[]> => {
        const response = await apiClient.get<ApiResponse<TimeSlot[]>>('/timeSlots/admin-timeslot', {
            params: { date }
        });
        return response.data.data;
    },

    generateSlots: async(data:GenerateTimeSlotDTO): Promise<TimeSlot[]> => {
        const response = await apiClient.post<ApiResponse<TimeSlot[]>>('/timeSlots/generate',data);
        return response.data.data;
    },

    clearSlotsByDate:async(date:string):Promise<void> => {
        await apiClient.delete<ApiResponse<void>>('/timeSlots', {
            params:{date}
        });
    }
}