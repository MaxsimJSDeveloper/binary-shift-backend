import { UsersCollection } from '../db/models/user.js';
import { WatersCollection } from '../db/models/water.js';
import { calculateDailyStats } from '../utils/calculateDailyStats.js';
import { formatPortionDate } from '../utils/formatPortionDate.js';

export const getMonthWater = async ({ filter = {}, userId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const dailyNorm = user.dailyNorma;
  const portions = await WatersCollection.find({ userId });

  // Форматування дат
  const formattedPortions = portions.map(formatPortionDate);

  // Фільтрація за роком та місяцем
  const filteredPortions = formattedPortions.filter((portion) => {
    return (
      (!filter.year || portion.year === filter.year) &&
      (!filter.month || portion.month === filter.month) &&
      (!filter.day || portion.day === filter.day)
    );
  });

  const result = calculateDailyStats(filteredPortions, dailyNorm);

  return result;
};
