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
