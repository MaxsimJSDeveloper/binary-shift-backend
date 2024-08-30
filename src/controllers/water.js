import createHttpError from 'http-errors';
import {
  addWater,
  deleteWater,
  updateUserDailyNorma,
  updateWater,
} from '../services/water.js';

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

  const result = await updateWater(
    id,
    {
      ...req.body,
    },
    req.user._id,
  );

  if (!result) {
    throw createHttpError(404, 'Water not found');
  }

  res.json({
    status: 200,
    message: 'Successfully updated water data!',
    data: result,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;

  await deleteWater(id, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Successfully deleted',
  });
};

// export const getDailyNormaController = async (req, res) => {
//   const data = await getDailyNorma({ userId: req.user._id });

//   res.status(200).json({
//     message: `Success!`,
//     dailyNorma: data,
//   });
// };

export const updateDailyNormaController = async (req, res, next) => {
  try {
    const { error, value } = updateDailyNormaSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.message);
    }

    const { dailyNorma } = value;
    const { userId } = req.user;

    const updatedUser = await updateUserDailyNorma(userId, dailyNorma);

    res.status(200).json({
      status: 'success',
      data: {
        dailyNorma: updatedUser.dailyNorma,
      },
    });
  } catch (err) {
    next(err);
  }
};
