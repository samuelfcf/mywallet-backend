import { Router } from 'express';
import {
  getTransactions,
  postTransacion
} from './controllers/TransactionsController.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

const router = Router();

router.get('/status', (_, res) => {
  res.send({
    message: 'Server ok!'
  });
});

// Public Routes
router.use('/', userRouter);
router.use('/', authRouter);

/* 
// Privated Routes
router.post('/user/:id/transactions', ensureAuthenticated, postTransacion);
router.get('/user/:id/transactions', ensureAuthenticated, getTransactions); */

export default router;
