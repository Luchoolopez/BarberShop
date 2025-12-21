import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../validations/user.schema";
import { validateSchema } from "../middlewares/validateSchema";
import { authenticateToken } from "../middlewares/auth.middleware";

const userRouter = Router();
const userController = new UserController();

//publica
userRouter.post('/login', validateSchema(loginUserSchema), userController.login);
userRouter.post('/register', validateSchema(registerUserSchema), userController.register);
userRouter.get('/me', authenticateToken, userController.getMe);
userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getUsers);
userRouter.put('/:id', authenticateToken, validateSchema(updateUserSchema), userController.updateUser);
//admin
userRouter.put('/promote/:id', authenticateToken, userController.promoteToAdmin);

export default userRouter;
export { userRouter as Router };