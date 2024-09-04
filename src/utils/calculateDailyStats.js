export const calculateDailyStats = (response, dailyNorm) => {
  const portions = response.map((item) => ({
    day: item.day,
    month: item.month,
    volume: item._doc.volume,
  }));

  console.log(`Processing data for portions: ${JSON.stringify(portions)}`);

  const daysMap = {};

  portions.forEach((portion) => {
    const day = portion.day;
    const month = portion.month;

    if (!daysMap[day]) {
      daysMap[day] = {
        day,
        month,
        totalVolume: 0,
        portions: 0,
      };
    }
    daysMap[day].totalVolume += portion.volume;
    daysMap[day].portions += 1;
  });

  return Object.values(daysMap).map((dayInfo) => {
    const dailyNormPercent =
      dailyNorm > 0 ? (dayInfo.totalVolume * 100) / dailyNorm : 0;

    console.log(
      `Calculating daily norm percentage for ${dayInfo.day}: ${dailyNormPercent}`,
    );

    return {
      date: `${dayInfo.day}, ${dayInfo.month}`,
      dailyNorm,
      dailyNormPercent: `${dailyNormPercent.toFixed(1)}%`,
      portions: dayInfo.portions,
    };
  });
};
