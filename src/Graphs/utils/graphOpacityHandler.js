export const graphOpacityHandler = (color, isForecast, context, yearValue) => {
  const index = context?.dataIndex;
  const year = yearValue || context?.chart?.data?.labels[index];

  const currentYear = new Date().getFullYear();

  if (isForecast) return `${color}90`;
  if (year > currentYear) return `${color}`;

  return color;
};
