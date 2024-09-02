import { getMonthWater } from '../services/month.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getMonthWaterController = async (req, res) => {
  const filter = parseFilterParams(req.query);

  const waters = await getMonthWater({ filter, userId: req.user._id });
  res.status(200).json({
    status: 200,
    message: 'Success!',
    data: waters,
  });
};
