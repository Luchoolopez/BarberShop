import { z } from 'zod';

export const createAppointmentSchema = z.object({
    time_slot_id: z.number() 
        .int()
        .positive({ 
            message: "El ID del horario debe ser un número positivo" 
        }),

    service_id: z.number() 
        .int()
        .positive({ 
            message: "El ID del servicio debe ser un número positivo" 
        })
});

export const cancelAppointmentSchema = z.object({
    reason: z.string().optional()
});

export type CreateAppointmentType = z.infer<typeof createAppointmentSchema>;