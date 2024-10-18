/* eslint-disable indent */
const ranges = [
  { divider: 1e18, suffix: "E" },
  { divider: 1e15, suffix: "P" },
  { divider: 1e12, suffix: "T" },
  { divider: 1e9, suffix: "B" },
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "k" },
];

export const formatNumber = (n) => {
  if (n === 0 || n < 1000 || Number.isNaN(n)) {
    return n;
  }
  for (let i = 0; i < ranges.length; i++) {
    if (n < 0) {
      return "-" + formatNumber(-n);
    }
    if (n >= ranges[i].divider) {
      const formattedValue = (n / ranges[i].divider).toFixed(1);
      if (formattedValue.endsWith(".0")) {
        return parseInt(formattedValue) + ranges[i].suffix;
      } else {
        return formattedValue + ranges[i].suffix;
      }
    }
  }
  return n.toString();
};
