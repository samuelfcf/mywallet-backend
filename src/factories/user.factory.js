import faker from 'faker';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import { JWT_CONFIG } from '../utils/constants.js';

const userRepository = new UserRepository();

const fakeUserSignUp = {
  id: faker.datatype.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

const invalidFakeUserSignUp = {
  id: faker.datatype.number(),
  name: faker.name.findName()
};

const fakeUserSignIn = {
  email: fakeUserSignUp.email,
  password: fakeUserSignUp.password
};

const invalidFakeUserSignIn = {
  email: fakeUserSignUp.email
};

const fakeUserInvalidCredentials = {
  email: fakeUserSignUp.email,
  password: fakeUserSignUp.email
};

const { name, email, password } = fakeUserSignUp;
const createUser = async () => userRepository.create({ name, email, password });

const deleteUser = async () => userRepository.delete();

const createToken = async () => {
  const user = await createUser();
  const { secret, expiresIn } = JWT_CONFIG;
  const token = jwt.sign(
    {
      email: user.email
    },
    secret,
    {
      subject: user.id.toString(),
      expiresIn
    }
  );

  return token;
};

export {
  fakeUserSignUp,
  fakeUserSignIn,
  fakeUserInvalidCredentials,
  invalidFakeUserSignUp,
  invalidFakeUserSignIn,
  createUser,
  createToken,
  deleteUser
};
