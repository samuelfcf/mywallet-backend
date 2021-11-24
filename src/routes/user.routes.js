import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const userRouter = Router();

userRouter.post('/sign-up', UsersController.create);

export default userRouter;
