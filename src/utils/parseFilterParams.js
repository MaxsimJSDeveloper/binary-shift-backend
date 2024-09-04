export const parseFilterParams = (query) => {
  const { day, month, year } = query;

  return {
    day: day ? parseInt(day) : undefined,
    month: month ? month : undefined,
    year: year ? parseInt(year) : undefined,
  };
};
