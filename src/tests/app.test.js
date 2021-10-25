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

describe("POST /log-in", () => {

  afterAll(async () => {
    await connection.query("DELETE FROM sessions WHERE user_id <> 7;")
  })

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

describe("GET /log-out", () => {

  beforeAll(async () => {
    await connection.query("INSERT INTO sessions (user_id, token) VALUES (7, 'd6a21e3d-7933-4fba-b3ff-109d4fdcb035');");
  })

  afterAll(async () => {
    await connection.query("DELETE FROM sessions WHERE token='d6a21e3d-7933-4fba-b3ff-109d4fdcb035';");
  })

  test("returns 401 for not auth user", async () => {
    const result = await supertest(app)
      .get("/log-out")
      .set('Authorization', ' ')
      .send({})

    expect(result.status).toEqual(401);
  });

  test("returns 401 for invalid token", async () => {
    const result = await supertest(app)
      .get("/log-out")
      .set('Authorization', 'Bearer este_é_um_token_inválido')
      .send({})

    expect(result.status).toEqual(401);
  });

  test("returns 200 for successful logout", async () => {
    const result = await supertest(app)
      .get("/log-out")
      .set('Authorization', 'Bearer d6a21e3d-7933-4fba-b3ff-109d4fdcb035')
      .send({})

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('message');
  });
});