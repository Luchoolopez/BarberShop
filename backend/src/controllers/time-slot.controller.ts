import { Request, Response } from "express";
import { TimeSlotService } from "../services/time-slot.service";

export class TimeSlotController {
    private timeSlotService: TimeSlotService;

    constructor() {
        this.timeSlotService = new TimeSlotService();
    }

    generateSlots = async (req: Request, res: Response) => {
        try {
            const slots = await this.timeSlotService.generateDailySlots(req.body);
            return res.status(201).json({
                success: true,
                message: 'Horarios generados exitosamente',
                count: slots.length,
                data: slots
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error al generar horarios',
                error: error.message
            });
        }
    }

    //api/slots?date=2025-12-15
    getSlotsByDate = async (req: Request, res: Response) => {
        try {
            const { date } = req.query;
            if (!date || typeof date !== 'string') {
                return res.status(400).json({
                    success: false,
                    mesagge: 'La fecha no es valida, tiene que ser (YYYY-MM-DD)'
                })
            }
            const slots = await this.timeSlotService.getAvailableSlots(date);

            if ((await slots).length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'No hay horarios disponibles para esta fecha',
                    data: []
                });
            }
            return res.status(200).json({
                success: true,
                data: slots
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error al generar horarios',
                error: error.message
            });
        }
    }

    deleteSlotsByDate = async (req: Request, res: Response) => {
        try {
            const { date } = req.query;
            if (!date || typeof date !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Debes proporcionar una fecha valida'
                });
            }
            const deletedCount = await this.timeSlotService.clearSlotsByDate(date);
            return res.status(200).json({
                success: true,
                message: `Se eliminaron ${deletedCount} horarios libres del dia ${date}`
            })

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error al generar horarios',
                error: error.message
            });
        }
    }
}