export const reformDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'long' });

  return `${day}, ${month}`;
};
