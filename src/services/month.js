import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

export const getMouthWater = async ({ filter = {}, userId }) => {
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
      const matchesDay = filter.day ? parseInt(day) === filter.day : true;
      const matchesMonth = filter.month ? month === filter.month : true;
      return matchesDay && matchesMonth;
    });
  }

  if (filter.day !== undefined && filter.month !== undefined) {
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
  }

  return filteredResult;
};
