import connection from '../database/connection.js';

async function ensureAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  const [, token] = authToken?.split(' ');
  const user_id = req?.params.id;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const result = await connection.query(
      `
      SELECT
        *
      FROM users
      JOIN sessions
        ON sessions.user_id = users.id
      WHERE sessions.token = $1
    `,
      [token]
    );

    const user = result.rows[0];

    if (!user || (user_id && parseInt(user.user_id) !== parseInt(user_id))) {
      return res.sendStatus(401);
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

export default ensureAuthenticated;
