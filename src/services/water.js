import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';

export const addWater = async (payload) => {
  const water = new WatersCollection({
    ...payload,
    userId: payload.userId,
  });
  await water.save();
  return water;
};

export const updateWater = async (id, payload, userId, options = {}) => {
  const rawResult = await WatersCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true, ...options },
  );

  if (!rawResult) return null;

  return {
    waterData: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (id, userId) => {
  const water = await WatersCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return water;
};

// export const getDailyNorma = async () => {
//   const data = await UsersCollection.find();

//   return data;
// };

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
