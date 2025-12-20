import { Router } from "express";
import { TimeSlotController } from "../controllers/time-slot.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { validateSchema } from "../middlewares/validateSchema";
import { generateTimeSlotsSchema, getTimeSlotsQuerySchema } from "../validations/time-slot.schema";

const timeSlotRouter = Router();
const timeSlotController = new TimeSlotController();

//publica
timeSlotRouter.get('/', validateSchema(getTimeSlotsQuerySchema, 'query'), timeSlotController.getSlotsByDate);
//admin
timeSlotRouter.get('/admin-timeslot', authenticateToken, isAdmin, validateSchema(getTimeSlotsQuerySchema, 'query'), timeSlotController.getAdminSlotsByDate )
timeSlotRouter.post('/generate', authenticateToken, isAdmin, validateSchema(generateTimeSlotsSchema), timeSlotController.generateSlots);
timeSlotRouter.delete('/', authenticateToken, isAdmin, validateSchema(generateTimeSlotsSchema, 'query'), timeSlotController.deleteSlotsByDate);


export default timeSlotRouter;
export {timeSlotRouter as Router};