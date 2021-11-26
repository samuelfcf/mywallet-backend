import UserSchema from '../schemas/UserSchema.js';
import UserService from '../services/UserService.js';

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const { error } = UserSchema.validate({ name, email, password });
      if (error) {
        return res.sendStatus(400);
      }

      const userService = new UserService();
      const user = await userService.create({
        name,
        email,
        password
      });

      return res.status(201).send({
        code: 201,
        data: {
          user: {
            name: user.name,
            email: user.email
          }
        }
      });
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
}

export default new UsersController();
