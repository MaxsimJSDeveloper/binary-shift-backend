import createHttpError from 'http-errors';
import {
  addWater,
  deleteWater,
  getAllWater,
  getDailyNorma,
  updateWater,
} from '../services/water.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getWaterController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const waters = await getAllWater({ filter, userId: req.user._id });
  res.status(200).json({
    status: 200,
    message: 'Success!',
    data: waters,
    amountOfWater: waters.length,
  });
};

export const addWaterController = async (req, res) => {
  const waterData = {
    ...req.body,
    userId: req.user._id,
  };

  const newPortion = await addWater(waterData);

  res.status(201).json({
    status: 201,
    message: `Successfully add water!`,
    data: newPortion,
  });
};

export const updateWaterController = async (req, res) => {
  const { id } = req.params;

  const result = await updateWater(id, {
    ...req.body,
    userId: req.user._id,
  });

  if (!result) {
    return res.status(404).json({ message: 'Water not found' });
  }

  res.json({
    status: 200,
    message: 'Successfully updated water data!',
    data: result,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;

  const deletedWater = await deleteWater(id, req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted',
    data: deletedWater,
  });
};

export const getDailyNormaController = async (req, res) => {
  const data = await getDailyNorma({ userId: req.user._id });

  res.status(200).json({
    message: `Success!`,
    dailyNorma: data,
  });
};
