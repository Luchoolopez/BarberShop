import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validations/user.schema";
import { validateSchema } from "../middlewares/validateSchema";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', validateSchema(loginUserSchema), userController.login);
userRouter.post('/register', validateSchema(registerUserSchema), userController.register);
userRouter.get('/:id', userController.getUser);
userRouter.get('/', userController.getUsers);

export default userRouter;
export { userRouter as Router };