import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

export const getMonthWater = async ({ filter = {}, userId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const dailyNorm = user.dailyNorma;
  const portions = await WatersCollection.find({ userId });

  const formattedResult = portions.map((portion) => ({
    id: portion.id,
    date: reformDate(portion.date),
    volume: portion.volume,
  }));

  let filteredResult = formattedResult;

  if (filter.day !== undefined && filter.month !== undefined) {
    filteredResult = formattedResult.filter((portion) => {
      const [day, month] = portion.date.split(', ');
      return parseInt(day) === parseInt(filter.day) && month === filter.month;
    });

    const totalVolume = filteredResult.reduce(
      (sum, portion) => sum + portion.volume,
      0,
    );

    const dailyNormPercent = (totalVolume * 100) / dailyNorm;

    return {
      date: `${filter.day}, ${filter.month}`,
      dailyNorm,
      dailyNormPercent: `${dailyNormPercent.toFixed(1)}%`,
      portions: filteredResult.length,
    };
  } else if (filter.month !== undefined) {
    const daysMap = {};

    formattedResult.forEach((portion) => {
      const [day, month] = portion.date.split(', ');
      if (month === filter.month) {
        if (!daysMap[day]) {
          daysMap[day] = {
            date: `${day}, ${month}`,
            totalVolume: 0,
            portions: 0,
          };
        }
        daysMap[day].totalVolume += portion.volume;
        daysMap[day].portions += 1;
      }
    });

    const resultArray = Object.values(daysMap).map((dayInfo) => {
      const dailyNormPercent = (dayInfo.totalVolume * 100) / dailyNorm;
      return {
        date: dayInfo.date,
        dailyNorm,
        dailyNormPercent: `${dailyNormPercent.toFixed(1)}%`,
        portions: dayInfo.portions,
      };
    });

    return resultArray;
  }

  return filteredResult;
};
