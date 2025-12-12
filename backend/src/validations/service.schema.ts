import {z} from 'zod';

const baseServiceSchema = {
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    description: z.string().min(5, 'La descripcion es muy corta'),
    price:z.coerce.number().min(0, 'El precio no puede ser negativo'),
    duration_minutes: z.number().int().positive('La duracion debe ser positiva'),
    points_reward: z.number().int().min(0).default(0),
    active: z.boolean().default(true)
};

export const createServiceSchema = z.object(baseServiceSchema);
export type CreateServiceType = z.infer<typeof createServiceSchema>;

//partial para que todos los campos sean opcionales 
export const updateServiceSchema = z.object(baseServiceSchema).partial();
export type UpdateServiceType = z.infer<typeof updateServiceSchema>;
