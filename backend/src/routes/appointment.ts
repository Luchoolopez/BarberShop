import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { validateSchema } from "../middlewares/validateSchema";
import { createAppointmentSchema, cancelAppointmentSchema } from "../validations/appointment.schema";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

//publica
appointmentRouter.post('/', authenticateToken, validateSchema(createAppointmentSchema), appointmentController.createAppointment);
appointmentRouter.get('/my-history', authenticateToken, appointmentController.getMyHistory);
appointmentRouter.put('/:id/cancel', authenticateToken, appointmentController.cancelAppointment);

//admin
appointmentRouter.get('/daily', authenticateToken, isAdmin, appointmentController.getDailyAgenda);
appointmentRouter.put('/:id/complete', authenticateToken, isAdmin, appointmentController.completeAppointment);
appointmentRouter.patch('/:id/status', authenticateToken, isAdmin, appointmentController.updateStatus);

export default appointmentRouter;
export {appointmentRouter as Router};
