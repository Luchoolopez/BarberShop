import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validateSchema = (
    schema: ZodType<any>,
    source: 'body' | 'query' | 'params' = 'body'
) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data;
            if (source === 'body') {
                data = req.body;
            } else if (source === 'query') {
                data = req.query;
            } else {
                data = req.params;
            }

            await schema.parseAsync(data);

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