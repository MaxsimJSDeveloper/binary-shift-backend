import { updateUser } from "../services/waterRate.js";

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
