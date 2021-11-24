import { Router } from 'express';
import {
  getTransactions,
  postTransacion
} from './controllers/TransactionsController.js';
import ensureAuthenticated from './middlewares/ensureAuthenticated.js';
import UsersController from './controllers/UsersController.js';

const router = Router();

router.get('/status', (req, res) => {
  res.send({
    message: 'Server ok!'
  });
});

// Public Routes
router.post('/sign-up', UsersController.create);
/* router.post('/log-in', logIn);

// Privated Routes
router.get('/log-out', ensureAuthenticated, logOut);
router.post('/user/:id/transactions', ensureAuthenticated, postTransacion);
router.get('/user/:id/transactions', ensureAuthenticated, getTransactions); */

export default router;
