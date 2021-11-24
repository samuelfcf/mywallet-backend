import connection from '../database/connection.js';
import { v4 as uuid } from 'uuid';
import UserSchema from '../schemas/UserSchema.js';
import UserLoginSchema from '../schemas/UserLoginSchema.js';
import UserService from '../services/UserService.js';
import AuthService from '../services/AuthService.js';

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const { error } = UserSchema.validate({ name, email, password });
      if (error) {
        return res.sendStatus(400);
      }

      const userService = new UserService();
      await userService.create({
        name,
        email,
        password
      });

      return res.sendStatus(201);
    } catch (err) {
      if (err.message.includes('already')) {
        return res.status(409).send({
          message: err.message
        });
      }

      return res.status(500).send({
        message: `Cannot create user. Error: ${err.message}`
      });
    }
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const { error } = UserLoginSchema.validate({ email, password });
      if (error) {
        return res.sendStatus(400);
      }

      const authUser = new AuthService();

      const { user, token } = await authUser.authenticate({
        email,
        password
      });

      return res.status(200).send({
        message: 'Authentication successful!',
        data: {
          id: user.id,
          email: user.email,
          token: token
        }
      });
    } catch (err) {
      if (err.message.includes('Invalid')) {
        return res.status(401).send({
          message: err.message
        });
      }

      return res.status(500).send({
        message: `Cannot authenticate user. Error: ${err.message}`
      });
    }
  }
}

export default new UserController();

/* async function logIn(req, res) {
  

  try {
    

    const result = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send({
        message: 'Email/senha incorretos'
      });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({
        message: 'Email/senha incorretos'
      });
    }

    const token = uuid();
    const name = user.name;
    const id = user.id;

    await connection.query(
      `INSERT INTO sessions (user_id, token) VALUES ($1, $2)`,
      [user.id, token]
    );
    res.status(200).send({
      id,
      name,
      token,
      message: 'Usuário logado com sucesso!!'
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
      message: 'Logout realizado com sucesso!!'
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
} */
