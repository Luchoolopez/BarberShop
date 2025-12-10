import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError, success } from "zod";

export const validateSchema = (schema: ZodType<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const issues = error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                }));

                return res.status(400).json({
                    success: false,
                    message: 'Error de validacion',
                    error: issues
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
