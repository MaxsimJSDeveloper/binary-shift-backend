export const parseFilterParams = (query) => {
  const { day, month } = query;

  return {
    day: day ? parseInt(day) : undefined,
    month: month ? month : undefined,
  };
};
