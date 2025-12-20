import { useCallback, useEffect, useState } from "react";
import type { Service, CreateServiceDTO, UpdateServiceDTO } from "../types/service.types"; 
import { serviceService } from "../services/service.service";

export const useService = (onlyActive: boolean = true) => {
    const [service, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchService = useCallback(async () => {
        setLoading(true);
        try {
            const data = onlyActive ? await serviceService.getActiveService() : await serviceService.getAllServices();
            setServices(data);
            setError(null); 
        } catch (error) {
            setError('Error al cargar los servicios');
        } finally {
            setLoading(false);
        }
    }, [onlyActive]);

    useEffect(() => {
        fetchService();
    }, [fetchService]);



    const createService = async (data: CreateServiceDTO) => {
        setLoading(true);
        try {
            await serviceService.createService(data);
            await fetchService(); 
        } catch (error: any) {
            setError('Error al crear el servicio');
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    // Editar
    const updateService = async (id: number, data: UpdateServiceDTO) => {
        setLoading(true);
        try {
            await serviceService.updateService(id, data);
            await fetchService(); 
        } catch (error: any) {
            setError('Error al actualizar el servicio');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Borrar
    const deleteService = async (id: number) => {
        setLoading(true);
        try {
            await serviceService.deleteService(id);
            await fetchService(); 
        } catch (error: any) {
            setError('Error al eliminar el servicio');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { 
        service, 
        loading, 
        error, 
        refetch: fetchService,
        createService,
        updateService,
        deleteService
    };
};