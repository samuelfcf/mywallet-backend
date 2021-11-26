import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();

authRouter.post('/sign-in', AuthController.authenticate);

export default authRouter;
