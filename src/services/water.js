import { WatersCollection } from '../db/models/water.js';
import createHttpError from 'http-errors';

export const getWaterRecords = async ({ page, perPage, userId }) => {
  const skip = (page - 1) * perPage;
  const query = { userId };

  const [records, count] = await Promise.all([
    WatersCollection.find(query).skip(skip).limit(perPage).exec(),
    WatersCollection.countDocuments(query),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    records,
    page,
    perPage,
    totalItems: count,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const getWaterRecordById = async (id, userId) => {
  return await WatersCollection.findOne({ _id: id, userId });
};

export const createWaterRecord = async (data) => {
  return await WatersCollection.create(data);
};

export const updateWaterRecord = async (id, data, userId) => {
  const record = await WatersCollection.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true },
  );

  if (!record) {
    throw createHttpError(404, 'Water record not found');
  }

  return record;
};

export const deleteWaterRecord = async (id, userId) => {
  const record = await WatersCollection.findOneAndDelete({ _id: id, userId });

  if (!record) {
    throw createHttpError(404, 'Water record not found');
  }

  return record;
};
