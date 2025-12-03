import { Request, Response, NextFunction } from "express";
import {ZodSchema, ZodError} from "zod";

export const validateSchema = (schema:ZodSchema) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        try{
            await schema.parseAsync(req.body);
            next();
        }catch(error){
            if(error instanceof ZodError){
                res.status(400).json({
                    status: 'error',
                    message: 'Error de validacion',
                    error: error
                });
            }
            return;
        }
        res.status(500).json({
            status:'error',
            message:'Error interno del servidor'
        });

    }
}