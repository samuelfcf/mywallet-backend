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
