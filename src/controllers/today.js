import { getTodayWater } from "../services/today.js";

export const todayWaterController = async (req, res) => {
    const { id: userId, dailyNorma } = req.user; 


  const todayWater =  await getTodayWater(userId, dailyNorma)

  res.status(200).json({
    status: 200,
    message: `Successfully!`,
    data: todayWater,
  });

  
}