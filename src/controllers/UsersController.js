import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/database.js";
import UserSchema from "../schemas/UserSchema.js";
import UserLoginSchema from "../schemas/UserLoginSchema.js";

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

async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const { error } = UserLoginSchema.validate({ email, password });

    if (error) {
      res.sendStatus(400);
    }

    const result = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) {
      res.status(400).send({
        message: "Email/senha incorretos"
      });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.status(400).send({
        message: "Email/senha incorretos"
      });
    }


    const token = uuid();
    await connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [user.id, token]);
    res.status(200).send({
      token,
      message: "Usuário logado com sucesso!!"
    });

  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export {
  postUser,
  logIn
}