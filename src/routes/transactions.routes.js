import { Router } from 'express';
import ensureAuth from '../middlewares/ensureAuth.js';
import TransactionsController from '../controllers/TransactionsController.js';

const transactionsRouter = Router();

transactionsRouter.post(
  '/:userId/transactions',
  ensureAuth,
  TransactionsController.create
);

transactionsRouter.get(
  '/:userId/transactions',
  ensureAuth,
  TransactionsController.getTransactions
);

export default transactionsRouter;
