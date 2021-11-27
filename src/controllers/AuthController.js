import UserLoginSchema from '../schemas/UserLoginSchema.js';
import AuthService from '../services/AuthService.js';

class AuthController {
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
          name: user.name,
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

export default new AuthController();
