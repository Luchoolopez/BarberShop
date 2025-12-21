import apiClient from "./apiClient";
import type { Appointment, CreateAppointmentDTO } from "../types/appointment.types";

export const appointmentService = {
    //publico
    createAppointment: async (data: CreateAppointmentDTO): Promise<Appointment> => {
        const response = await apiClient.post<{data: Appointment}>('/appointment', data);
        return response.data.data;
    },

    getMyHistory: async (): Promise<Appointment[]> => {
        const response = await apiClient.get<{data: Appointment[]}>('/appointment/my-history');
        return response.data.data;
    },

    cancelAppointment: async (id: number, reason?: string): Promise<Appointment> => {
        const response = await apiClient.put<{data: Appointment}>(`/appointment/${id}/cancel`, { reason });
        return response.data.data;
    },


    //admin

     getDailyAgenda: async (date: string): Promise<Appointment[]> => {
        const response = await apiClient.get<{data: Appointment[]}>('/appointment/daily', {
            params: { date }
        });
        return response.data.data;
    },

    completeAppointment: async (id: number): Promise<Appointment> => {
        const response = await apiClient.put<{data: Appointment}>(`/appointment/${id}/complete`);
        return response.data.data;
    },

    updateStatus: async (id: number, status: string): Promise<Appointment> => {
        const response = await apiClient.patch<{data: Appointment}>(`/appointment/${id}/status`, { status });
        return response.data.data;
    }

    
};