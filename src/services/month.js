import { WatersCollection } from '../db/models/water.js';
import { reformDate } from '../utils/reformDate.js';

export const getMouthWater = async ({ filter = {}, userId }) => {
  const formattedPortions = await WatersCollection.find({ userId });

  const formattedResult = formattedPortions.map((portion) => ({
    _id: portion._id,
    date: reformDate(portion.date),
    volume: portion.volume,
    createdAt: portion.createdAt,
    updatedAt: portion.updatedAt,
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
      data: filteredResult,
      portions: filteredResult.length,
      totalVolume, // сума випитої води за обраний день
    };
  }

  return filteredResult;
};
