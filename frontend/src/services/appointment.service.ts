import apiClient from "./apiClient";

export const appointmentService = {
    cancelAppointment: async (appointmentId: number): Promise<void> => {
        await apiClient.put(`/appointment/${appointmentId}/cancel`);
    }
};