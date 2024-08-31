import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (userId, updateData) => {
  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};
