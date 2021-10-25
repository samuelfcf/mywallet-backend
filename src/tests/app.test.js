import app from "../app.js";
import supertest from "supertest";
import connection from "../database/database.js";

describe("POST /sign-up", () => {

  beforeEach(async () => {
    await connection.query("DELETE FROM users WHERE name='Teste';");
  })

  test("returns 400 for invalid body", async () => {
    const result = await supertest(app)
      .post("/sign-up")
      .send({})

    expect(result.status).toEqual(400);
  });

  test("returns 409 for duplicated user", async () => {
    const body = {
      name: "Xaropinho",
      email: "xarope@email.com",
      password: "123456"
    }

    const result = await supertest(app)
      .post("/sign-up")
      .send(body);

    expect(result.status).toEqual(409);
  });

  test("returns 201 for valid user register", async () => {
    const body = {
      name: "Teste",
      email: "teste@email.com",
      password: "123456"
    }

    const result = await supertest(app)
      .post("/sign-up")
      .send(body);

    expect(result.status).toEqual(201);
    expect(result.body).toHaveProperty('name');
  });
});

describe('POST /log-in', () => {

  test("returns 400 for invalid body", async () => {
    const result = await supertest(app)
      .post("/log-in")
      .send({})

    expect(result.status).toEqual(400);
  });

  test("returns 400 for incorrect email or password", async () => {
    const body = {
      email: "teste@email.com",
      password: "puts errei a senha"
    }

    const result = await supertest(app)
      .post("/log-in")
      .send(body);

    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty('message');
  });

  test("returns 200 for login user successfully", async () => {
    const body = {
      email: "teste@email.com",
      password: "123456"
    }

    const result = await supertest(app)
      .post("/log-in")
      .send(body);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('name');
  })
});