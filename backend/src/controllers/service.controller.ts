import { Request, Response } from "express";
import { ServiceService } from "../services/service.service";

export class serviceController {
    private serviceService: ServiceService
    constructor() {
        this.serviceService = new ServiceService();
    }

    createService = async (req: Request, res: Response) => {
        try {
            const createdService = await this.serviceService.createService(req.body);
            return res.status(201).json({
                success: true,
                message: 'Servicio creado',
                data: createdService
            });
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    getAllServices = async (req: Request, res: Response) => {
        try {
            const services = await this.serviceService.getAllServices();
            return res.status(200).json({
                success: true,
                message: 'Servicios obtenidos correctamente',
                data: services
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }

    getActiveServices = async (req: Request, res: Response) => {
        try {
            const activeServices = await this.serviceService.getActiveServices();

            return res.status(200).json({
                success: true,
                message: 'Servicios activos encontrados exitosamente',
                data: activeServices
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }

    getServiceById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'El ID es invalido'
                });
            }
            const service = await this.serviceService.getServiceById(Number(id));
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'El servicio no fue encontrado'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Servicio encontrado',
                data: service
            });
        } catch (error: any) {
            if (error.message === 'Servicio no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }

            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }

    updateService = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(404).json({
                    success: false,
                    message: 'El ID es invalido'
                });
            }
            const updatedService = await this.serviceService.updateService(Number(id), req.body);
            return res.status(200).json({
                success: true,
                message: 'Servicio actualizado exitosamente',
                data: updatedService
            });
        } catch (error: any) {
            if (error.message === 'Servicio no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }

            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }

    deleteService = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(404).json({
                    success: false,
                    message: 'El ID es invalido'
                });
            }
            await this.serviceService.deleteService(Number(id));

            return res.status(200).json({
                success: true,
                message: 'Servicio eliminado correctamente'
            });
        } catch (error: any) {
            if (error.message === 'Servicio no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }

            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }
}