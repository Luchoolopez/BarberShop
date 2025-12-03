import { z } from 'zod';

export const createAdminSchema = z.object({
    email: z.string().email({ message: 'Email invalido'}),
    password: z.string().min(6, {message: 'Minimo 6 caracteres'})
});

type CreateAdminType = z.infer<typeof createAdminSchema>