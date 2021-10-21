import bcrypt from "bcrypt";
import connection from "../database/database.js";
import UserSchema from "../schemas/UserSchema.js";

async function postUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const { error } = UserSchema.validate({ name, email, password });

    if (error) {
      res.sendStatus(400);
    }

    const result = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rowCount > 0) {
      res.sendStatus(409);
    } else {
      const passwordHash = bcrypt.hashSync(password, 10);

      await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash]);
      res.status(201).send({
        name,
        email,
        message: "Usuário cadastrado com sucesso!!"
      });
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export {
  postUser
}