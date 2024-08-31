import {UsersCollection} from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';

export const getTodayWater = async (userId, dailyNorma) => {

  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);


  const numberOfValue = await WatersCollection.find({
    userId: userId,
    createdAt: { $gte: startOfDay}, 
  });

  const totalConsumed = numberOfValue.reduce((sum, num) => sum + num.volume, 0);

  const percentageConsumed = Math.round((totalConsumed / dailyNorma) * 100);

  return {percentageConsumed: `${percentageConsumed}%`,
  numberOfValue,}

}