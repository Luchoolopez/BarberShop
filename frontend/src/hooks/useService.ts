import type { Service } from "../types/service.types";
import { serviceService } from "../services/service.service";
import { useCallback, useEffect, useState } from "react";

export const useService = (onlyActive:boolean = true) => {
    const [service, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchService = useCallback(async() => {
        setLoading(true);
        try{
            const data = onlyActive ? await serviceService.getActiveService() : await serviceService.getAllServices();
            setServices(data);
        }catch(error){
            setError('Error al cargar los servicios');
        }finally{
            setLoading(false);
        }
    }, [onlyActive]);

    useEffect(() => {
        fetchService();
    }, [fetchService]);

    return {service, loading, error, refetch:fetchService};
};