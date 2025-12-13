import { serviceController } from "../controllers/service.controller";
import { Router } from "express";
import { createServiceSchema, updateServiceSchema } from "../validations/service.schema";
import { validateSchema } from "../middlewares/validateSchema";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const serviceRouter = Router();
const servicerController = new serviceController();

//rutas publicas
serviceRouter.get('/', servicerController.getActiveServices);
serviceRouter.get('/:id', servicerController.getServiceById);

//rutas protegidas 
serviceRouter.post('/', authenticateToken, isAdmin, validateSchema(createServiceSchema), servicerController.createService);
serviceRouter.put('/:id', authenticateToken, isAdmin, validateSchema(updateServiceSchema), servicerController.updateService);
serviceRouter.delete('/:id', authenticateToken, isAdmin, servicerController.deleteService);
serviceRouter.get('/admin/all', authenticateToken, isAdmin, servicerController.getAllServices);

export default serviceRouter;
export { serviceRouter as Router };