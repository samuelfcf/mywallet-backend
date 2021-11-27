import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database/connection.js';
import {
  fakeUserSignUp,
  createToken,
  deleteUser
} from '../src/factories/user.factory.js';
import * as F from '../src/factories/transactions.factory.js';

afterAll(async () => {
  await F.deleteTransaction();
  await deleteUser();
  connection.end();
});

describe('POST /user/:userId/transaction', () => {
  test('returns 200 for create transaction successful', async () => {
    const token = await createToken();
    const result = await supertest(app)
      .post(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });

  test('returns 401 for non-existent token', async () => {
    const result = await supertest(app)
      .post(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', '');
    expect(result.status).toEqual(401);
  });

  test('returns 401 for invalid token', async () => {
    const result = await supertest(app)
      .post(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', 'Bearer invalid_token');
    expect(result.status).toEqual(401);
  });
});

describe('GET /user/:userId/transaction', () => {
  test('returns 200 for get transactions successful', async () => {
    const token = await createToken();
    const result = await supertest(app)
      .get(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });

  test('returns 401 for non-existent token', async () => {
    const result = await supertest(app)
      .post(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', '');
    expect(result.status).toEqual(401);
  });

  test('returns 401 for invalid token', async () => {
    const result = await supertest(app)
      .post(`/user/${fakeUserSignUp.id}/transactions`)
      .send(F.fakeTransaction)
      .set('Authorization', 'Bearer invalid_token');
    expect(result.status).toEqual(401);
  });
});
