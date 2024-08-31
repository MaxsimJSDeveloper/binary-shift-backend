import createHttpError from 'http-errors';

import { getDailyNorma, updateUserDailyNorma } from '../services/waterRate.js';
import { dailyNormaWaterSchema } from '../validation/water.js';

export const getDailyNormaController = async (req, res) => {
  const data = await getDailyNorma({ userId: req.user._id });

  res.status(200).json({
    message: `Success!`,
    dailyNorma: data,
  });
};

export const updateDailyNormaController = async (req, res, next) => {
  try {
    const { error, value } = dailyNormaWaterSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.message);
    }

    const { dailyNorma } = value;
    const userId = req.user._id;

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
