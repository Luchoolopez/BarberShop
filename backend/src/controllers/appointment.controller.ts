import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

interface AuthRequest extends Request {
    user?: {
        id: number,
        role: string
    }
}

export class AppointmentController {
    private appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    createAppointment = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthRequest).user?.id;
            if (!userId) {
                return res.status(401).json({
                    message: 'Usuario no autenticado'
                });
            }

            const appointment = await this.appointmentService.createAppointment(userId, req.body);
            return res.status(201).json({
                success: true,
                message: 'Turno reservado exitosamente',
                data: appointment
            });
        } catch (error: any) {
            console.error(error);
            const status = error.message.includes('encontrado') || error.message.includes('ocupado') ? 400 : 500;
            return res.status(status).json({
                success: false,
                message: error.message
            })
        }
    }

    cancelAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'El ID es invalido'
                });
            }

            const user = (req as AuthRequest).user;

            if (!user) {
                return res.status(401).json({
                    message: 'No autorizado'
                })
            }
            const isAdmin = user.role === 'admin';

            const appointment = await this.appointmentService.cancelAppointment(Number(id), user.id, isAdmin);
            return res.status(200).json({
                success: true,
                message: 'Turno cancelado correctamente',
                data: appointment
            });
        } catch (error:any) {
            return res.status(400).json({
                success:false,
                message:error.message
            });
        }
    }

    getMyHistory = async(req:Request, res:Response) => {
        try{
            const userId = (req as AuthRequest).user?.id;
            if(!userId){
                return res.status(401).json({
                    message:'No autorizado'
                });
            }
            const appointments = await this.appointmentService.getAppointmentByUser(userId);
            return res.status(200).json({
                success:true,
                count:appointments.length,
                data:appointments
            });
        }catch(error:any){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    getDailyAgenda = async(req:Request, res:Response) => {
        try{
            const {date} = req.query;
            if(!date || typeof date !== 'string'){
                return res.status(400).json({
                    message:'Fecha requerida (YYYY-MM-DD)'
                });
            }
            const appointments = await this.appointmentService.getAppointmentByDate(date);
            return res.status(200).json({
                success:true,
                date:date,
                count:appointments.length,
                data:appointments
            });
        }catch(error:any){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}