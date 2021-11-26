import connection from '../database/connection.js';

class TransactionsRepository {
  async createNewTransaction({ userId, value, description, inflow, date }) {
    await connection.query(
      `INSERT INTO transactions (user_id, value, description, inflow, date) VALUES ($1, $2, $3, $4, $5);`,
      [userId, value, description, inflow, date]
    );
  }

  async getUserTransactions({ userId }) {
    const result = await connection.query(
      `SELECT * FROM transactions WHERE user_id = $1;`,
      [userId]
    );
    const transactions = result.rows;
    return transactions;
  }

  async delete() {
    await connection.query('DELETE FROM transactions;');
  }
}

export default TransactionsRepository;
