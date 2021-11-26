import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database/connection.js';
import * as F from '../src/factories/user.factory.js';

afterAll(async () => {
  await F.deleteUser();
  connection.end();
});

describe('POST /sign-up', () => {
  afterEach(async () => {
    await F.createUser();
  });

  test('returns 201 for created user successful', async () => {
    const result = await supertest(app).post('/sign-up').send(F.fakeUserSignUp);
    expect(result.status).toEqual(201);
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send(F.invalidFakeUserSignUp);
    expect(result.status).toEqual(400);
  });

  test('returns 409 for user already exists', async () => {
    const result = await supertest(app).post('/sign-up').send(F.fakeUserSignUp);
    expect(result.status).toEqual(409);
  });
});

describe('POST /sign-in', () => {
  test('returns 200 for login succesful', async () => {
    const result = await supertest(app).post('/sign-in').send(F.fakeUserSignUp);
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('data');
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send(F.invalidFakeUserSignUp);
    expect(result.status).toEqual(400);
  });

  test('returns 401 invalid credentials', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send(F.fakeUserInvalidCredentials);
    expect(result.status).toEqual(401);
  });
});
