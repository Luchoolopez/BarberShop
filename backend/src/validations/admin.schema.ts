import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email({ message: 'Email invalido'}),
    password: z.string().min(6, {message: 'Minimo 6 caracteres'}),
    phone: z.string().max(20),
    role: z.enum(['admin', 'client'])
});

type CreateUserType = z.infer<typeof createUserSchema>