export const formatPortionDate = (portion) => {
  const date = new Date(portion.date);
  return {
    ...portion,
    year: date.getUTCFullYear(),
    month: date.toLocaleString('en-US', { month: 'long' }),
    day: date.getUTCDate(),
  };
};
