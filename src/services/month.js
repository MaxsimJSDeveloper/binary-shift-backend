import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

export const getMouthWater = async ({ filter = {}, userId }) => {
  const formattedPortions = await WatersCollection.find({ userId });

  const formattedResult = formattedPortions.map((portion) => ({
    date: reformDate(portion.date),
    volume: portion.volume,
  }));

  let filteredResult = formattedResult;

  if (filter.day !== undefined || filter.month) {
    filteredResult = formattedResult.filter((portion) => {
      const [day, month] = portion.date.split(', ');
      const matchesDay = filter.day ? parseInt(day) === filter.day : true;
      const matchesMonth = filter.month ? month === filter.month : true;
      return matchesDay && matchesMonth;
    });
  }

  if (filter.day !== undefined) {
    const totalVolume = filteredResult.reduce(
      (sum, portion) => sum + portion.volume,
      0,
    );

    return {
      date: `${filter.day}, ${filter.month}`,
      portions: filteredResult.length,
      totalVolume,
    };
  }

  return filteredResult;
};
