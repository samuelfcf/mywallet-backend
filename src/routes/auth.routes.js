import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const authRouter = Router();

authRouter.post('/sign-in', UsersController.authenticate);

export default authRouter;
