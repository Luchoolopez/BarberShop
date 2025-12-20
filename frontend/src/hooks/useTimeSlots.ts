import { useState, useCallback } from "react";
import { timeSlotService } from "../services/time-slot.service";
import type { TimeSlot, GenerateTimeSlotDTO } from "../types/time-slot.types";

export const useTimeSlots = () => {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSlots = useCallback(async (date: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await timeSlotService.getAdminSlotsByDate(date);
            setSlots(data);
        } catch (err: any) {
            console.error(err);
            setError('Error al cargar los horarios.');
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const generateSlots = async (data: GenerateTimeSlotDTO) => {
        setLoading(true);
        setError(null);
        try {
            await timeSlotService.generateSlots(data);
            await fetchSlots(data.date);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Error al generar los horarios.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearDay = async (date: string) => {
        setLoading(true);
        setError(null);
        try {
            await timeSlotService.clearSlotsByDate(date);
            await fetchSlots(date);
        } catch (err: any) {
            console.error(err);
            setError('Error al limpiar el día.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        slots,
        loading,
        error,
        fetchSlots,
        generateSlots,
        clearDay
    };
};