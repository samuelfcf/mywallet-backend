import connection from "../database/connection.js";
import TransactionSchema from "../schemas/TransactionSchema.js";

async function postTransacion(req, res) {
  const { value, description, inflow, date } = req.body;
  const user_id = req.params.id;

  try {
    const { error } = TransactionSchema.validate({ user_id, value, description, inflow, date });

    if (error) {
      return res.sendStatus(400);
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
      return res.sendStatus(404);
    }

    await connection.query(`INSERT INTO transactions (user_id, value, description, inflow, date) VALUES ($1, $2, $3, $4, $5)`, [user_id, value, description, inflow, date]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function getTransactions(req, res) {
  const user_id = req.params.id;
  try {
    const result = await connection.query(`SELECT * FROM transactions WHERE user_id = $1`, [user_id]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export {
  postTransacion,
  getTransactions
}