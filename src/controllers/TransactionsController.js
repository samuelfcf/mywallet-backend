import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/database.js";
import TransactionSchema from "../schemas/TransactionSchema.js";

async function postTransacion(req, res) {
  const { value, description, inflow, date } = req.body;
  const user_id = req.params.id;
  const authToken = req.headers.authorization;
  const [, token] = authToken?.split(' ');

  try {
    const { error } = TransactionSchema.validate({ user_id, value, description, inflow, date });

    if (error) {
      res.sendStatus(400);
    }

    const result = await connection.query(`
      SELECT
       *
      FROM users
        JOIN sessions
          ON users.id = sessions.user_id
      WHERE users.id = $1
    `, [user_id]);

    if (result.rowCount === 0) {
      res.sendStatus(404);
    }

    await connection.query(`INSERT INTO transactions (user_id, value, description, inflow, date) VALUES ($1, $2, $3, $4, $5)`, [user_id, value, description, inflow, date]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export {
  postTransacion
}