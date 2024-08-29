import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';

export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw createHttpError(401, 'Authorization header is required');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid Authorization format');
    }

    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createHttpError(401, 'Access token expired');
    }

    req.userId = session.userId;
    next();
  } catch (error) {
    next(error);
  }
};
