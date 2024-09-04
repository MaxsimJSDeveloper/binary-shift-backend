export const filterPortionsByYearAndMonth = (portions, year, month) => {
  return portions.filter((portion) => {
    return portion.year === year && portion.month === month;
  });
};
