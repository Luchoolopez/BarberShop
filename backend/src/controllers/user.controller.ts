import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.Login(req.body);

            return res.status(200).json({
                success: true,
                message: 'Inicio de sesion exitoso',
                data: result
            })
        } catch (error: any) {
            if (error.message === 'Credenciales invalidas' || error.message === 'El usuario no existe') {
                return res.status(401).json({
                    success: false,
                    message: 'Email o contraseñas incorrectos'
                });
            }
            //para errores inesperados
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.Register(req.body);

            return res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result
            })
        } catch (error: any) {
            if (error.message === 'El usuario ya existe') {
                return res.status(409).json({
                    success: false,
                    message: 'El email ya esta registrado'
                });
            }

            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    success: false,
                    message: 'El ID es invalido'
                });
            }

            const user = await this.userService.getUser(Number(id));

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    getUsers = async (req: Request, res: Response) => {
        try {

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const users = await this.userService.getAllUsers(page, limit);

            return res.status(200).json({
                success: true,
                message: 'Usuarios obtenidos correctamente',
                data: users
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            })
        }
    }

    promoteToAdmin = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(404).json({
                    success: false,
                    message: 'ID invalido'
                });
            }
            const user = await this.userService.promoteToAdmin(Number(id));

            return res.status(200).json({
                success: true,
                message: 'Usuario promovido a administrador',
                data: { id: user.id, name: user.name, role: user.role }
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(404).json({
                    success: false,
                    message: 'ID invalido'
                });
            }
            const updatedUser = await this.userService.updateUser(Number(id), req.body);
            return res.status(200).json({
                success: true,
                message: 'Usuario actualizado correctamente',
                data: updatedUser
            })
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    getMe = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id; 

            if (!userId) {
                return res.status(400).json({ success: false, message: 'Token inválido' });
            }

            const user = await this.userService.getUser(userId);

            if (!user) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            res.json({
                success: true,
                data: { user }
            });

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al obtener perfil' });
        }
    }
}