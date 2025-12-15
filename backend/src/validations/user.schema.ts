import { z } from 'zod';

export const registerUserSchema = z.object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 letras' }),
    email: z.string().email({ message: 'Email invalido' }),
    password: z.string().min(6, { message: 'Minimo 6 caracteres' }),
    phone: z.string().max(20),
});

export type registerUserType = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().email({ message: 'Email invalido' }),
    password: z.string().min(1, { message: 'Minimo 6 caracteres' }),
});

export const UserSchema = z.object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 letras' }),
    email: z.string().email({ message: 'Email invalido' }),
    phone: z.string().max(20),
})

export const updateUserSchema = UserSchema.partial();
export type UpdateUserType = z.infer<typeof updateUserSchema>;

export type LoginUserType = z.infer<typeof loginUserSchema>;