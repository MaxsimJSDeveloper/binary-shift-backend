import { updateUser, getDailyNorma } from "../services/waterRate.js";

export const getDailyNormaController = async (req, res, next) => {
  try {
    const dailyNorma = await getDailyNorma(req.user._id);

    res.json({
      message: 'Daily water intake retrieved successfully!',
      status: 200,
      data: {
        dailyNorma,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateWaterRateController = async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.user._id, { dailyNorma: req.body.dailyNorma });
    res.json({
      message: 'Daily water intake updated successfully!',
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
