import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

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

  const formattedPortions = allPortionsOfWater.map((portion) => ({
    _id: portion._id,
    date: reformDate(portion.date),
    volume: portion.volume,
    createdAt: portion.createdAt,
    updatedAt: portion.updatedAt,
  }));

  return formattedPortions;
};

export const updateWater = async (id, payload, options = {}) => {
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
