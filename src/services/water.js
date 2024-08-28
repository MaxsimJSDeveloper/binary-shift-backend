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
