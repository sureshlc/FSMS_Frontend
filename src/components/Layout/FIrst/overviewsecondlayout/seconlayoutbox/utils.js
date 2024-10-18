import { graphOpacityHandler } from "../../../../../Graphs/utils/graphOpacityHandler";

const colorsObj = {
  Red: "#FE6161",
  Green: "#5ED070",
  Yellow: "#FEC35B",
};

export const getBarColorAccordingToValue = (
  value,
  threshold,
  isPositive,
  isForecast
) => {
  // Guard clauses
  if (
    value === null ||
    value === undefined ||
    !Array.isArray(threshold) ||
    threshold.length === 0
  ) {
    return null;
  }

  if (threshold.length === 1) {
    // Single threshold case
    if (value >= threshold[0]) {
      return graphOpacityHandler(
        isPositive ? colorsObj.Green : colorsObj.Red,
        isForecast
      );
    } else {
      return graphOpacityHandler(isPositive ? colorsObj.Red : colorsObj.Green);
    }
  } else {
    // Two thresholds case
    if (value >= threshold[0] && value <= threshold[1]) {
      return graphOpacityHandler(colorsObj.Yellow, isForecast);
    }
    if (value < threshold[0]) {
      return graphOpacityHandler(
        isPositive ? colorsObj.Red : colorsObj.Green,
        isForecast
      );
    } else {
      return graphOpacityHandler(
        isPositive ? colorsObj.Green : colorsObj.Red,
        isForecast
      );
    }
  }
};
