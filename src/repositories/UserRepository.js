import connection from '../database/connection.js';

class UserRepository {
  async create({ name, email, password }) {
    const result = await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [name, email, password]
    );
    const user = result.rows[0];
    return user;
  }

  async find({ email }) {
    const result = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [email]
    );
    const userExists = result.rows[0];
    return userExists;
  }

  async delete() {
    await connection.query('DELETE FROM users;');
  }
}

export default UserRepository;
