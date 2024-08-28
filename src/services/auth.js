import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
const user = await UsersCollection.findOne({ email: payload.email });
if (!user) {
  throw createHttpError(404, 'User not found');
}

const isEqual = await bcrypt.compare(payload.password, user.password);
if (!isEqual) {
  throw createHttpError(401, 'Unathorized')
}

await SessionsCollection.deleteOne({ userId: user._id });

const accessToken = randomBytes(30).toString('base64');
const refreshToken = randomBytes(30).toString('base64');

return await SessionsCollection.create({
  userId: user._id,
  accessToken,
  refreshToken,
  accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
})
};
