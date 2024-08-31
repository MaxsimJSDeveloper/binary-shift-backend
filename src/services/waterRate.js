import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getDailyNorma = async (userId) => {
  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user.dailyNorma;
};

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
