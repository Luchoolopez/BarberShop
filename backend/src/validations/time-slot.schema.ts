import {z} from 'zod';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const generateTimeSlotsSchema = z.object({
    date:z.string().regex(DATE_REGEX, {
        message:'La feche debe tener formato YYYY-MM-DD'
    }),
    open_time:z.string().regex(TIME_REGEX, {
        message:'La hora de apertura debe ser HH:MM'
    }),
    close_time:z.string().regex(TIME_REGEX, {
        message: 'La hora de cierre debe ser HH:MM'
    }),
    interval_minutes:z.number().int().positive().min(15,{
        message:'El intervalo debe ser de al menos 15 minutos'
    })
}).refine((data) => {
    //la hora de cierre no puede ser antes que la de apertura
    return data.close_time > data.open_time;
}, {
    message: 'La hora de cierre debe ser posterior a la apertura',
    path:['close_time']//el error va a aparecer en ese campo
});

export type GenerateTimeSlotType = z.infer<typeof generateTimeSlotsSchema>;

export const getTimeSlotsQuerySchema = z.object({
    date:z.string().regex(DATE_REGEX, {
        message:'Formato de fecha invalido (YYYY-MM-DD)'
    }).optional()
})