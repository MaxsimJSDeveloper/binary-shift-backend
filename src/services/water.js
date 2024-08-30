import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

export const addWater = async (payload) => {
  const water = new WatersCollection({
    ...payload,
    userId: payload.userId,
  });
  await water.save();
  return water;
};

export const getAllWater = async ({ filter = {}, userId }) => {
  const formattedPortions = await WatersCollection.find({ userId });

  const formattedResult = formattedPortions.map((portion) => ({
    _id: portion._id,
    date: reformDate(portion.date),
    volume: portion.volume,
    createdAt: portion.createdAt,
    updatedAt: portion.updatedAt,
  }));

  if (filter.day !== undefined || filter.month) {
    return formattedResult.filter((portion) => {
      const [day, month] = portion.date.split(', ');
      const matchesDay = filter.day ? parseInt(day) === filter.day : true;
      const matchesMonth = filter.month ? month === filter.month : true;
      return matchesDay && matchesMonth;
    });
  }

  return formattedResult;
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

export const getDailyNorma = async () => {
  const data = await UsersCollection.find();

  return data;
};
