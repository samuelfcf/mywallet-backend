import { JWT_CONFIG } from '../utils/constants.js';
import verify from 'jsonwebtoken';

const ensureAuth = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.sendStatus(401);
  }

  try {
    const [, token] = authToken?.split(' ');
    const { sub } = verify(token, JWT_CONFIG.secret);

    req.user = {
      id: sub
    };

    return next();
  } catch (err) {
    console.log(err.message);
    return res.senStatus(401);
  }
};

export default ensureAuth;
