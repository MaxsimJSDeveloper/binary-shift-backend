import { addWater, getAllWater, getDailyNorma } from '../services/water.js';

export const getWaterController = async (req, res) => {
  const waterPortions = await getAllWater();

  res.status(200).json({
    status: 200,
    message: `Success!`,
    data: waterPortions,
  });
};

export const addWaterController = async (req, res) => {
  const waterData = {
    ...req.body,
    // userId: req.user._id,
  };

  const newPortion = await addWater(waterData);

  res.status(201).json({
    status: 201,
    message: `Successfully add water!`,
    data: newPortion,
  });
};

export const getDailyNormaController = async (req, res) => {
  const data = await getDailyNorma();

  res.status(200).json({
    message: `Success!`,
    dailyNorma: data.dailyNorma,
  });
};
