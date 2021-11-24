import TransactionsRepository from '../repositories/TransactionsRopository.js';

class TransactionsService {
  async postTransactions({ userId, value, description, inflow, date }) {
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

  async getTransactions({ userId }) {
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
