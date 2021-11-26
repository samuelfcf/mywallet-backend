import faker from 'faker';
import TransactionsRepository from '../repositories/TransactionsRepository.js';
import { fakeUserSignUp } from './user.factory.js';

const transactionsRepository = new TransactionsRepository();

const fakeTransaction = {
  userId: fakeUserSignUp.id,
  value: faker.datatype.number(),
  description: faker.finance.transactionDescription(),
  inflow: Boolean((Math.random() * 2) << 0),
  date: faker.datatype.datetime()
};

const { userId, value, description, inflow, date } = fakeTransaction;
const createTransaction = async () =>
  transactionsRepository.createNewTransaction({
    userId,
    value,
    description,
    inflow,
    date
  });

const deleteTransaction = async () => transactionsRepository.delete();

export { fakeTransaction, createTransaction, deleteTransaction };
