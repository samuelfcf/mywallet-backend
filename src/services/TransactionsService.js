import TransactionsRepository from '../repositories/TransactionsRepository.js';

class TransactionsService {
  async create({ userId, value, description, inflow, date }) {
    const transactionsRepository = new TransactionsRepository();
    const transaction = await transactionsRepository.createNewTransaction({
      userId,
      value,
      description,
      inflow,
      date
    });

    return transaction;
  }

  async findTransactions({ userId }) {
    const transactionsRepository = new TransactionsRepository();
    const transactions = await transactionsRepository.getUserTransactions({
      userId
    });

    if (!transactions) {
      throw new Error('No transactions for this user!');
    }

    return transactions;
  }
}

export default TransactionsService;
