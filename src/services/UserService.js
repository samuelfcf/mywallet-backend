import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';

class UserService {
  async create({ name, email, password }) {
    const userRepository = new UserRepository();

    const userExists = await userRepository.find({ email });
    if (userExists) {
      throw new Error('User already exists!');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await userRepository.create({
      name,
      email,
      password: passwordHash
    });

    return user;
  }
}

export default UserService;
