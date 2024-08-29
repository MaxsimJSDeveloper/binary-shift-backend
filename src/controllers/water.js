import {
  getWaterRecords,
  getWaterRecordById,
  createWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
} from '../services/water.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getWaterRecordsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const waterRecords = await getWaterRecords({
      page,
      perPage,
      userId: req.user._id,
    });

    res.status(200).json({
      status: 200,
      message: 'Water records retrieved successfully',
      data: waterRecords,
    });
  } catch (error) {
    next(error);
  }
};

export const getWaterRecordByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const waterRecord = await getWaterRecordById(id, req.user._id);

    if (!waterRecord) {
      return next(createHttpError(404, 'Water record not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Water record retrieved successfully',
      data: waterRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const createWaterRecordController = async (req, res, next) => {
  try {
    const newWaterRecord = await createWaterRecord({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Water record created successfully',
      data: newWaterRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWaterRecordController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedWaterRecord = await updateWaterRecord(
      id,
      req.body,
      req.user._id,
    );

    if (!updatedWaterRecord) {
      return next(createHttpError(404, 'Water record not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Water record updated successfully',
      data: updatedWaterRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWaterRecordController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteWaterRecord(id, req.user._id);

    if (!result) {
      return next(createHttpError(404, 'Water record not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
