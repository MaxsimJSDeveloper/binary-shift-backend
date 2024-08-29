import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';

export const addWater = async (payload) => {
  const water = new WatersCollection({
    ...payload,
    // userId: payload.userId,
  });
  await water.save();
  return water;
};

export const getAllWater = async () => {
  const allPortionsOfWater = await WatersCollection.find();
  return allPortionsOfWater;
};

export const updateWater = async (id, payload, options = {}) => {
  console.log('Payload to update:', payload);

  const rawResult = await WatersCollection.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, ...options },
  );

  if (!rawResult) return null;

  return {
    waterData: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (id) => {
  const water = await WatersCollection.findOneAndDelete({
    _id: id,
    // userId,
  });
  return water;
};

export const getDailyNorma = async () => {
  const data = await UsersCollection.find();

  return data;
};
