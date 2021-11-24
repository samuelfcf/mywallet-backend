import connection from '../database/connection.js';

class UserRepository {
  async create({ name, email, password }) {
    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, password]
    );
  }
}

export default UserRepository;
