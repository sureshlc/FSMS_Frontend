import { Egypt, Iraq, Lebanon, Syria } from "../assets/icons";
// import Accordion from "../components/Accordion";
import BottomRightBox from "../components/Layout/FIrst/overviewsmallbox/BottomRightBox";
import BoxDataitem from "../components/Layout/FIrst/overviewsmallbox/BoxDataitem";
import { IndicatorBox } from "../components/Layout/index.sc";
import GridAccordion, {
  GridAccordionFoProduction,
} from "../components/grid-accordion";
import {
  ConsumptionMapping,
  FoodPriceMapping,
  FoodSecurityMapping,
  InvestmentMapping,
  OthersMapping,
  OverviewMapping,
  ProductionMapping,
  SustainabilityMapping,
} from "../constants/gridMapping";
import { sidebarMockData } from "../mock-data/sidebar";

export const flagMapping = {
  Iraq: <Iraq />,
  Egypt: <Egypt />,
  "Syrian Arab Republic": <Syria />,
  Lebanon: <Lebanon />,
};

export const overviewl2ViewWidgets = {
  two: IndicatorBox,
//   three: Accordion,
};

export const foodSecurityl2ViewWidgets = {
  one: BottomRightBox,
  two: BottomRightBox,
  three: BoxDataitem,
  four: BoxDataitem,
  five: BoxDataitem,
  six: BoxDataitem,
  seven: BottomRightBox,
};
export const consumptionl2ViewWidgets = {
  one: BottomRightBox,
  two: BottomRightBox,
  three: GridAccordion,
};

export const productionl2ViewWidgets = {
  one: BottomRightBox,
  two: BottomRightBox,
  three: GridAccordionFoProduction,
};

export const investmentl2ViewWidgets = {
  one: BottomRightBox,
  two: BottomRightBox,
  three: BottomRightBox,
};
export const foodPricel2ViewWidgets = {
  one: BottomRightBox,
  two: BottomRightBox,
  three: BottomRightBox,
};

export const l2ViewMapping = {
  Overview: OverviewMapping,
  "food-security": FoodSecurityMapping,
  consumption: ConsumptionMapping,
  production_trade: ProductionMapping,
  investment: InvestmentMapping,
  food_price: FoodPriceMapping,
  sustainability: SustainabilityMapping,
  others: OthersMapping,
};

export const getCategoryLabel = (value) => {
  const findLabel = sidebarMockData.find((ele) => ele.value === value).name;
  return findLabel;
};

const ranges = [
  { divider: 1e18, suffix: "E" },
  { divider: 1e15, suffix: "P" },
  { divider: 1e12, suffix: "T" },
  { divider: 1e9, suffix: "B" },
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "K" },
];

export const formatNumber = (n, fixDecimalPlace) => {
  if (Number.isNaN(n) || n === 0 || (n > 0 && n < 1000)) {
    return fixDecimalPlace && !Number.isInteger(n)
      ? n.toFixed(fixDecimalPlace)
      : n;
  }
  for (let i = 0; i < ranges.length; i++) {
    if (n < 0) {
      return "-" + formatNumber(-n);
    }
    if (n >= ranges[i].divider) {
      const formattedValue = (n / ranges[i].divider).toFixed(
        fixDecimalPlace || 1
      );

      if (
        formattedValue.endsWith(".0") ||
        formattedValue.toString().endsWith(".00")
      ) {
        return parseInt(formattedValue) + ranges[i].suffix;
      } else {
        return formattedValue + ranges[i].suffix;
      }
    }
  }
  return n?.toString() || 0;
};

function linearScale(value, minInput, maxInput, minOutput, maxOutput) {
  // Clamp the input value to the specified range
  value = Math.min(Math.max(value, minInput), maxInput);

  // Perform linear interpolation
  return (
    ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
    minOutput
  );
}

export function getColorBasedOnSeverity(severity) {
  // Predefined array of colors
  const colors = ["#F5F5C7", "#F6C855", "#E49256", "#CF2F3A"];

  // Map severity to an index in the colors array using linear scaling
  const index = Math.round(linearScale(severity, 1, 6, 0, colors.length - 1));

  // Return the color based on severity
  return colors[index];
}

export const getIsGreen = (isPositive, yearly_change) => {
  return isPositive === yearly_change >= 0;
};

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
