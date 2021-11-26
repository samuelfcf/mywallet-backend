import { Router } from 'express';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import transactionsRouter from './routes/transactions.routes.js';

const router = Router();

router.get('/status', (_, res) => {
  res.send({
    message: 'Server ok!'
  });
});

router.use('/', userRouter);
router.use('/', authRouter);
router.use('/user', transactionsRouter);

export default router;
