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
      return res.sendStatus(400);
    }

    const result = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rowCount > 0) {
      return res.sendStatus(409);
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
      return res.sendStatus(400);
    }

    const result = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({
        message: "Email/senha incorretos"
      });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({
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

async function logOut(req, res) {
  const authToken = req.headers.authorization;
  const [, token] = authToken?.split(' ');

  try {
    await connection.query(`DELETE FROM sessions WHERE token = $1`, [token]);
    res.status(200).send({
      message: "Logout realizado com sucesso!!"
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export {
  postUser,
  logIn,
  logOut,
}