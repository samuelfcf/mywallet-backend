import { Router } from 'express';
import {
  getTransactions,
  postTransacion
} from './controllers/TransactionsController.js';
import UsersController from './controllers/UsersController.js';
import ensureAuth from './middlewares/ensureAuth.js';

const router = Router();

router.get('/status', (_, res) => {
  res.send({
    message: 'Server ok!'
  });
});

// Public Routes
router.post('/sign-up', UsersController.create);
router.post('/log-in', UsersController.authenticate);

/* 
// Privated Routes
router.get('/log-out', ensureAuthenticated, logOut);
router.post('/user/:id/transactions', ensureAuthenticated, postTransacion);
router.get('/user/:id/transactions', ensureAuthenticated, getTransactions); */

export default router;
