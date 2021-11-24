import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import { JWT_CONFIG } from '../utils/constants.js';

class AuthService {
  async authenticate({ email, password }) {
    const userRepository = new UserRepository();

    const userExists = await userRepository.find({ email });
    if (!userExists) {
      throw new Error('Invalid credentials');
    }

    const passMatch = compare(password, userExists.password);
    if (!passMatch) {
      throw new Error('Invalid credentials');
    }

    const { secret, expiresIn } = JWT_CONFIG;
    const token = jwt.sign(
      {
        email: userExists.email
      },
      secret,
      {
        subject: userExists.id.toString(),
        expiresIn
      }
    );

    return {
      user: userExists,
      token
    };
  }
}

export default AuthService;
