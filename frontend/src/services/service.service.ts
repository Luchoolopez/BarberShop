import apiClient from "./apiClient";
import type { Service, ApiResponse, CreateServiceDTO, UpdateServiceDTO } from "../types/service.types";

export const serviceService = {
    getAllServices:async():Promise<Service[]> => {
        const response = await apiClient.get<ApiResponse<Service[]>>('/service/admin/all');
        return response.data.data;
    },

    getActiveService:async():Promise<Service[]> => {
        const response = await apiClient.get<ApiResponse<Service[]>>('service');
        return response.data.data;
    },

    getServiceById:async(id:number):Promise<Service> => {
        const response = await apiClient.get<ApiResponse<Service>>(`/service/${id}`);
        return response.data.data;
    },

    createService:async(data:CreateServiceDTO): Promise<Service> => {
        const response = await apiClient.post<ApiResponse<Service>>('/service', data);
        return response.data.data;
    },

    updateService:async(id:number, data:UpdateServiceDTO): Promise<Service> => {
        const response = await apiClient.put<ApiResponse<Service>>(`/service/${id}`, data);
        return response.data.data;
    },

    deleteService:async(id:number):Promise<void> => {
        await apiClient.delete<ApiResponse<void>>(`/service/${id}`);
    }
}