import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getDailyNorma = async (userId) => {
  const data = await UsersCollection.findById(userId, 'dailyNorma');
  if (!data) {
    throw createHttpError(404, 'User not found');
  }
  return data.dailyNorma;
};

export const updateUserDailyNorma = async (userId, dailyNorma) => {
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { dailyNorma },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
