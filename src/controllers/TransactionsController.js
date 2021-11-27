import connection from '../database/connection.js';
import TransactionSchema from '../schemas/TransactionSchema.js';
import TransactionsService from '../services/TransactionsService.js';

class TransactionsController {
  async create(req, res) {
    const { value, description, inflow, date } = req.body;
    const { userId } = req.params;

    try {
      const { error } = TransactionSchema.validate({
        userId,
        value,
        description,
        inflow,
        date
      });
      if (error) return res.sendStatus(400);

      const transactionsService = new TransactionsService();
      await transactionsService.create({
        userId,
        value,
        description,
        inflow,
        date
      });

      return res.status(200).send({
        message: 'Created!'
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        message: `Cannot create transaction. Error: ${err.message}`
      });
    }
  }

  async getTransactions(req, res) {
    const { userId } = req.params;

    try {
      const transactionsService = new TransactionsService();
      const transactions = await transactionsService.findTransactions({
        userId
      });

      if (!transactions) return res.sendStatus(404);

      return res.status(200).send(transactions);
    } catch (err) {
      return res.status(500).send({
        message: `Cannot find transactions, Error: ${err.message}`
      });
    }
  }
}

export default new TransactionsController();
