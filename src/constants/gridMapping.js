import DynamicBarGraph from "../Graphs/ChartJsGraphs/BarGraph";
// import GroupedStackedBarChart from "../Graphs/ChartJsGraphs/GroupedStackedBarGraph";
import DynamicLine from "../Graphs/ChartJsGraphs/LineGraph";
import MultilineGraph from "../Graphs/ChartJsGraphs/MultilineGraph";
import ReusableMultilineGraph from "../Graphs/ChartJsGraphs/ReusableMultilineGraph";
import StackedAreaChart from "../Graphs/ChartJsGraphs/StackedArea";
import StackedBarChart from "../Graphs/ChartJsGraphs/StackedBarChart";
// import TreeMapChart from "../Graphs/ChartJsGraphs/TreemapGraph";
import GraphTrendCombo from "../components/GraphTrendCombo";
import Bardata from "../assets/Placeholder/Group 351215.png";
// import treedata from "../assets/Placeholder/tree graph.png";
import linedata from "../assets/Placeholder/lineimg.png";
import stackedbardata from "../assets/Placeholder/bar graph.png";
import stackedareadata from "../assets/Placeholder/Group 351328.png";
import graphtrendcombo from "../assets/Placeholder/small_graph.svg";

export const OverviewMapping = {
  one: [
    {
      id: 1,
      label: "",
      value: "map",
      info: "The food security prediction clustering algorithm is based on the following data points - Prevalence of moderate or severe food insecurity in the total population, Prevalence of undernourishment, Incidence of caloric losses at the retail distribution level, Percentage of children under 5 years of age who are overweight, Percentage of children under 5 years of age who are stunted, Percentage of population using at least basic drinking water services, Percentage of population using at least basic sanitation services, Prevalence of anemia among women of reproductive age, Export and Import values, Per capita food production variability, Per capita food supply variability and Yield.",
      type: "map",
      additionalClassName: "box",
    },
  ],
  two: [
    {
      id: 2,
      label: "Prevalence of Undernourishment",
      enableIcon: true,
      secondaryTitle: "3 years Average",
      value: "Prevalence of undernourishment",
      category: "food_security",
      info: "This variable is forecasted using XGBoost algorithm. XGBoost stands for eXtreme Gradient Boosting and is a powerful machine-learning tool that can be used for time series analysis. It supports both regression and classification predictive modeling problems.",
      component: DynamicBarGraph,
      noDataImage: stackedbardata,
      additionalClassName: "bigger-title",
    },
  ],
  three: [
    {
      id: 4,
      type: "accordion",

      items: {
        one: {
          title: "Production and trade clusters",
          fill: "#FF2121",
          enableIcon: true,
          iconColor: "#FF2121",
          info: "The production and trade prediction clustering algorithm is based on the following variables - Area harvested, Export and Import quantities, Export and import values, Gross production, Yield, Per capita food production variability, and Population.",

          data: [
            {
              value: "production_trade",
              component: DynamicBarGraph,
              noDataImage: Bardata,
              colors: ["#54A0FF"],
            },
          ],
        },

        two: {
          title: "Consumption Clusters",
          fill: "#F4C21C",
          enableIcon: true,
          iconColor: "#F4C208",
          info: "The consumption prediction clustering is based on Area, Domestic supply quantity, Feed, Indirect losses, Losses, Processed, Residuals, Seed, Stock variation, and Consumption per capita.",
          data: [
            {
              value: "consumption",
              graphType: "BarGraph",
              noDataImage: Bardata,
              component: DynamicBarGraph,
            },
          ],
        },
        three: {
          title: "Food prices",
          fill: "#4AC4F6",
          enableIcon: true,
          iconColor: "#4AC4F6",
          info: "This data covers the two major staple crops wheat and rice.",
          data: [
            {
              value: "food_price",
              graphType: "BarGraph",
              noDataImage: linedata,
              component: DynamicBarGraph,
              xAxisKey: "month",
            },
          ],
        },
      },
      additionalClassName: "box",
    },
  ],
  // three: [
  //   {
  //     id: 4,
  //     label: "",
  //     subLabel: "",
  //     type: "accordion",
  //     items: [
  //       {
  //         id: 1,
  //         enableIcon: true,
  //         iconColor: "#FF2121",
  //         additionalClassName: "bigger-title",
  //       },
  //       {
  //         id: 2,
  //         enableIcon: true,
  //         iconColor: "#F4C21C",
  //         additionalClassName: "bigger-title",
  //       },
  //       {
  //         id: 3,
  //         enableIcon: true,
  //         iconColor: "#4AC4F6",
  //         additionalClassName: "bigger-title",
  //       },
  //     ],
  //     additionalClassName: "box",
  //   },
  // ],
};

export const OverviewInfoAlertMapping = {
  alert: {},
  info: {
    0: "The production and trade prediction clustering algorithm is based on the following variables - Area harvested, Export and Import quantities, Export and import values, Gross production, Yield, Per capita food production variability, and Population.",
    1: "The consumption prediction clustering is based on Area, Domestic supply quantity, Feed, Indirect losses, Losses, Processed, Residuals, Seed, Stock variation, and Consumption per capita.",
    2: "This data covers the two major staple crops wheat and rice",
  },
};

export const FoodSecurityMapping = {
  one: [
    {
      id: 1,
      label: "Prevalence of Undernourishment",
      secondaryTitle: "%",
      value: "Prevalence of undernourishment",
      component: DynamicBarGraph,
      noDataImage: Bardata,
      additionalClassName: "bigger-title",
      tabTitle: "Undernourishment",
      // color: "#8089B4",
      info: "Thresholds are based on data either above or below one standard deviation",
    },
    {
      id: 2,
      label: "Prevalence of moderate or severe food insecurity",
      secondaryLabel: "3 years Average",
      secondaryTitle: "%",
      value:
        "Prevalence of moderate or severe food insecurity in the total population",
      component: ReusableMultilineGraph,
      showTotalInTooltip: false,
      noDataImage: linedata,
      additionalClassName: "bigger-title",

      colors: ["#00008B", "#82B6FE", "#F9A8E7"],
      tabTitle: "Food Insecurity",
    },
  ],
  two: [
    {
      id: 3,
      label: "Per Capita Food Supply variability",
      value: "Per capita food supply variability",
      component: DynamicBarGraph,

      noDataImage: Bardata,
      additionalClassName: "bigger-title",
      tabTitle: "Food Supply",
      // color: "#A0B3D1",
      info: "Thresholds are based on data either above or below one standard deviation",
    },
    {
      id: 4,
      label: "Per capita food production variability",
      value: "Per capita food production variability",
      component: DynamicBarGraph,

      additionalClassName: "bigger-title",
      noDataImage: Bardata,
      tabTitle: "Food Production",
      // color: "#87C6D8",
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  three: [
    {
      id: 5,
      label: "Prevalence of Stunting among ",
      subLabel: "Children under 5 (%)",
      value: "Percentage of children under 5 years of age who are stunted",
      additionalClassName: "bigger-title wrapped",
      smallbox: true,
      noDataImage: graphtrendcombo,
      type: "l0",
      component: GraphTrendCombo,
      showIndicatorArrow: true,
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  four: [
    {
      id: 6,
      label: "Prevalence of overweight among",
      subLabel: "Children under 5 (%)",
      value: "Percentage of children under 5 years of age who are overweight",
      additionalClassName: "bigger-title wrapped",
      smallbox: true,
      type: "l0",
      noDataImage: graphtrendcombo,
      component: GraphTrendCombo,
      showIndicatorArrow: true,
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  five: [
    {
      id: 9,
      label: "Sanitation",
      subLabel: "(%)",
      value:
        "Percentage of population using at least basic sanitation services",
      type: "l0",
      component: GraphTrendCombo,
      additionalClassName: "bigger-title wrapped",
      smallbox: true,
      noDataImage: graphtrendcombo,
      showIndicatorArrow: true,
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  six: [
    {
      id: 8,
      label: "Caloric losses",
      subLabel: "(%)",
      value: "Incidence of caloric losses at retail distribution level",
      additionalClassName: "bigger-title wrapped",
      noDataImage: graphtrendcombo,
      color: "#A2A0E9",
      type: "l1",
      smallbox: true,
      component: GraphTrendCombo,
      showIndicatorArrow: true,
      info: "Thresholds are based on data either above or below one standard deviation",

      // hideGraph: true,
    },
  ],
  seven: [
    {
      id: 7,
      label: "Prevalence of anemia among",
      subLabel: "women of reproductive age 15-49 years (%)",
      value: "Prevalence of anemia among women of reproductive age",
      noDataImage: Bardata,
      info: "Thresholds are based on data either above or below one standard deviation",
      // type: "l0",
      additionalClassName: "bigger-title",

      component: DynamicBarGraph,
    },
  ],
};

export const ConsumptionMapping = {
  one: [
    {
      id: 2,
      label: "Average daily food supply per capita",
      value: "average daily food supply",
      component: DynamicBarGraph,
      noDataImage: Bardata,
      tabTitle: "consumption",
      enableIcon: true,
      additionalClassName: "bigger-title",
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  three: [
    {
      id: 4,
      type: "accordion",

      items: {
        one: {
          title: "Average dietary energy supply adequacy",
          secondaryTitle: "%",
          subLabel: "3 years average",
          fill: "#FF2121",
          enableIcon: true,
          iconColor: "#FF2121",
          data: [
            {
              label: "Average dietary energy supply adequacy",
              // tabTitle: "Adequacy",
              unit: "%",
              value: "average dietary energy supply adequacy",
              component: DynamicLine,

              noDataImage: linedata,
              colors: ["#54A0FF"],
            },
            // {
            //   title: "Derived from cereals, roots and tubers",
            //   value:
            //     "share of dietary energy supply derived from cereals, roots and tubers",
            //   component: DynamicLine,

            //   noDataImage: linedata,
            //   tabTitle: "Cereals, Roots and Tubers",
            //   unit: "kcal/cap/day",
            //   colors: ["#54A0FF"],
            // },
          ],
        },

        two: {
          title: "Seed/Losses/Feed",
          secondaryTitle: "Tonnes",
          fill: "#F4C21C",
          enableIcon: true,
          iconColor: "#F4C208",
          info: "This data covers the three major staple crops wheat, rice, and maize.",
          data: [
            {
              tabTitle: "Seed",
              title: "Seed",
              unit: "Tonnes",
              value: "seed",
              graphType: "StackedBarChart",
              showTotalInTooltip: false,
              noDataImage: Bardata,
              component: StackedBarChart,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
            },
            {
              tabTitle: "Losses",
              title: "Losses",
              unit: "Tonnes",
              value: "losses",
              graphType: "StackedBarChart",
              noDataImage: Bardata,
              component: StackedBarChart,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
            },
            {
              tabTitle: "Feed",
              title: "Feed",
              unit: "Tonnes",
              value: "feed",
              graphType: "StackedBarChart",
              noDataImage: Bardata,
              component: StackedBarChart,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
            },
          ],
        },
        three: {
          title: "Protein Supply Quantity",
          iconColor: "#4AC4F6",
          secondaryTitle: "g/cap/day",
          data: [
            {
              unit: "g/cap/day",
              value: "protein supply quantity",
              graphType: "Multiline Graph",
              component: ReusableMultilineGraph,
              noDataImage: linedata,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
            },
          ],
        },
      },
      additionalClassName: "box",
    },
  ],
  two: [
    {
      id: 1,
      label: "Domestic supply quantity",
      secondaryTitle: "Tonnes",
      value: "domestic supply quantity",
      tabTitle: "Supply",
      component: ReusableMultilineGraph,
      additionalClassName: "bigger-title",
      graphType: "ReusableMultilineGraph",
      showTotalInTooltip: true,
      noDataImage: linedata,
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
    },
    {
      id: 2,
      label: "Stock Variation",
      secondaryTitle: "Tonnes",

      value: "stock variation",
      tabTitle: "Variation",
      component: ReusableMultilineGraph,
      graphType: "ReusableMultilineGraph",
      noDataImage: linedata,
      showTotalInTooltip: false,
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
    },
  ],
};

export const ProductionMapping = {
  one: [
    {
      id: 1,
      label: "Main cereals production yield",
      value: "yield",
      tabTitle: "Yield",
      component: ReusableMultilineGraph,
      additionalClassName: "bigger-title",
      graphType: "ReusableMultilineGraph",
      noDataImage: linedata,
      showTotalInTooltip: true,
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
      enableIcon: true,
      iconColor: "#FF2121",
    },
    {
      id: 2,
      label: "Production of main cereals",
      value: "production",
      tabTitle: "Production",
      graphType: "ReusableMultilineGraph",
      component: ReusableMultilineGraph,
      noDataImage: linedata,
      additionalClassName: "bigger-title",
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
      enableIcon: true,
      iconColor: "#FF2121",
      showTotalInTooltip: true,
    },
  ],
  two: [
    {
      id: 1,
      label: "Main cereals harvested Area ",
      value: "area harvested",
      component: ReusableMultilineGraph,
      noDataImage: linedata,
      graphType: "StackedBarChart",
      enableIcon: true,
      iconColor: "#A581E6",
      additionalClassName: "bigger-title",
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
      showTotalInTooltip: true,
    },
  ],
  three: [
    {
      id: 4,
      type: "accordion",
      items: {
        one: {
          title: "Value of agricultural production",
          secondaryTitle: "2014-2016 USD billion",
          enableIcon: true,
          iconColor: "#FF2121",
          data: [
            {
              label: "Gross Production Value",
              value: "gross production value",
              title: "Gross Production Value",
              tabTitle: "Gross Production Value",
              component: DynamicBarGraph,
              noDataImage: Bardata,

              colors: ["#9689F8"],
              unit: "USD",
            },
          ],
          // info: "Thresholds are based on data either above or below one standard deviation",
        },
        two: {
          title: "Exports",
          // secondaryTitle: "USD",
          fill: "#F4C21C",
          enableIcon: true,
          iconColor: "#F4C21C",
          data: [
            {
              tabTitle: "Value",
              value: "export value",
              title: "Export of main cereals",
              graphType: "ReusableMultilineGraph",
              component: ReusableMultilineGraph,
              noDataImage: linedata,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
              unit: "USD",
              showTotalInTooltip: true,
            },
            {
              tabTitle: "Quantities",
              value: "export quantity",
              title: "Export of main cereals",
              graphType: "ReusableMultilineGraph",
              component: ReusableMultilineGraph,
              noDataImage: linedata,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
              unit: "Tonnes",
              showTotalInTooltip: true,
            },
          ],
        },
        three: {
          title: "Imports",
          // secondaryTitle: "USD",
          fill: "#4AC4F6",
          enableIcon: true,
          iconColor: "#4AC4F6",
          data: [
            {
              tabTitle: "Value",
              value: "import value",
              title: "Import of main cereals",
              component: ReusableMultilineGraph,
              graphType: "ReusableMultilineGraph",
              noDataImage: linedata,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
              unit: "USD",
              showTotalInTooltip: true,
            },
            {
              tabTitle: "Quantities",
              value: "import quantity",
              title: "Import of main cereals",
              graphType: "ReusableMultilineGraph",
              component: ReusableMultilineGraph,
              noDataImage: linedata,
              colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
              unit: "Tonnes",
              showTotalInTooltip: true,
            },
          ],
        },
      },
      additionalClassName: "box",
    },
  ],
};

export const InvestmentMapping = {
  one: [
    {
      id: 1,
      label: "Central government expenditure on agriculture",
      value: "government expenditure",
      enableIcon: true,
      iconColor: "#FF2121",
      // subLabel: "3 Year Average",
      component: DynamicBarGraph,
      noDataImage: stackedbardata,
      graphType: "StackedBarCharts",
      additionalClassName: "bigger-title",

      // colors: [],
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  two: [
    {
      id: 1,
      label: "Gross fixed capital formation on agri, forestry, fishing",
      enableIcon: true,
      iconColor: "rgb(165, 129, 230)",

      // secondaryLabel: "3 Year Average",
      value: "gross fixed capital formation",
      component: DynamicBarGraph,

      noDataImage: Bardata,
      additionalClassName: "bigger-title",

      // colors: [],
      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
  three: [
    {
      id: 4,
      label: "Credit to agriculture",
      enableIcon: true,
      iconColor: "rgb(74, 196, 246)",
      subLabel: "",
      secondaryLabel: "",
      value: "credit to agriculture",
      component: DynamicBarGraph,

      noDataImage: Bardata,
      additionalClassName: "bigger-title",

      info: "Thresholds are based on data either above or below one standard deviation",
    },
  ],
};

export const FoodPriceMapping = {
  one: [
    {
      id: 4,
      label: "Consumer Price Index",
      value: "consumer price index",
      enableIcon: true,
      iconColor: "#FF2121",
      tabTitle: "Consumer Price Index",
      // subLabel: "3 Year Average",
      component: DynamicLine,

      noDataImage: linedata,
      additionalClassName: "bigger-title",

      colors: ["#66A4FB"],

      xAxisKey: "month",
    },
  ],
  two: [
    {
      id: 5,
      label: "Food Price Inflation",
      value: "food price inflation",
      enableIcon: true,
      iconColor: "rgb(244, 194, 28)",
      // subLabel: "3 Year Average",
      tabTitle: "Food Price Inflation",
      component: DynamicBarGraph,

      noDataImage: Bardata,
      additionalClassName: "bigger-title",

      colors: ["#FE6161"],

      xAxisKey: "month",
    },
  ],
  three: [
    {
      id: 1,
      label: "Main cereals Producer Prices",
      secondaryTitle: "usd/tonnes",
      value: "producer price",
      enableIcon: true,
      iconColor: "rgb(165, 129, 230)",
      tabTitle: "Producer Price",
      // subLabel: "3 Year Average",
      component: ReusableMultilineGraph,
      graphType: "ReusableMultilineGraph",
      noDataImage: linedata,
      additionalClassName: "bigger-title",

      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
    },
  ],
  four: [
    {
      id: 2,
      label: "Agriculture Producer Price Index",
      value: "producer price index",
      enableIcon: true,
      iconColor: "rgb(74, 196, 246)",
      tabTitle: "Producer Price Index",
      showTotalInTooltip: false,
      // subLabel: "3 Year Average",
      component: DynamicBarGraph,
      additionalClassName: "bigger-title",
      graphType: "GroupedStackedBarChart",
      noDataImage: Bardata,
      colors: ["#4666A2", "#4D80E0", "#2AB9C6"],
    },
  ],
};

export const SustainabilityMapping = {
  one: [
    {
      id: 4,
      label: "Greenhouse gas emissions from agrifood systems",
      value: "emissions - fumes",
      enableIcon: true,
      iconColor: "#FF2121",
      noDataImage: linedata,
      component: DynamicLine,
      additionalClassName: "bigger-title",
      colors: ["#FF51A6"],
    },
  ],
  two: [
    {
      id: 5,
      label: "Total water stress",
      value: "level of water stress",
      enableIcon: true,
      iconColor: "rgb(244, 194, 28)",
      component: DynamicLine,
      noDataImage: linedata,
      additionalClassName: "bigger-title",

      colors: ["#FF9F4D"],
    },
  ],
  three: [
    {
      id: 1,
      label: "Total water use efficiency",
      value: "water use efficiency",
      enableIcon: true,
      iconColor: "rgb(165, 129, 230)",
      component: StackedAreaChart,
      noDataImage: stackedareadata,
      additionalClassName: "bigger-title",
      colors: ["#69B2F7"],
      // gradients: ["#69B2F7", "#fff"],
    },
  ],
  four: [
    {
      id: 2,
      label: "Share of agricultural land in land area by use",
      secondaryTitle: "%",
      value: "land area share - agriculture",
      enableIcon: true,
      iconColor: "rgb(74, 196, 246)",
      component: StackedAreaChart,
      noDataImage: stackedareadata,
      additionalClassName: "bigger-title",
      showTotalInTooltip: true,
      colors: ["#FE7979", "#3953A4", "#8B6D47"],
    },
  ],
};
export const OthersMapping = {
  one: [
    {
      id: 4,
      label: "Energy use in agriculture",
      value: "energy usage",
      enableIcon: true,
      iconColor: "#FF2121",
      component: DynamicLine,
      noDataImage: linedata,
      additionalClassName: "bigger-title",
      colors: ["#4D80E0"],
    },
  ],
  two: [
    {
      id: 5,
      label: "Pesticides imports and exports",
      value: "pesticides",
      enableIcon: true,
      iconColor: "rgb(244, 194, 28)",
      graphType: "ReusableMultilineGraph",
      component: ReusableMultilineGraph,
      noDataImage: linedata,
      additionalClassName: "bigger-title",
      colors: ["#FF7C8E", "#2AB9C6"],
      showTotalInTooltip: true,
    },
  ],
  three: [
    {
      id: 1,
      label: "Inorganic fertilizers production and use",
      value: "fertilizers",
      enableIcon: true,
      iconColor: "rgb(165, 129, 230)",
      graphType: "ReusableMultilineGraph",
      component: ReusableMultilineGraph,
      noDataImage: linedata,
      stack: [1, 2, 2],
      additionalClassName: "bigger-title",
      colors: ["#5ED070", "#22B9FF", "#4874C2"],
      showTotalInTooltip: true,
    },
  ],
  four: [
    {
      id: 2,
      label: "Inorganic fertilizers imports and exports",
      value: "fertilizers - import/export",
      enableIcon: true,
      iconColor: "rgb(165, 129, 230)",
      graphType: "ReusableMultilineGraph",
      component: ReusableMultilineGraph,
      noDataImage: linedata,
      showTotalInTooltip: true,
      additionalClassName: "bigger-title",

      colors: ["#FF7C8E", "#2AB9C6"],
    },
    // {
    //   id: 2,
    //   label: "Export",
    //   tabTitle: "Export",
    //   value: "fertilizers - export",
    //   enableIcon: true,
    //   iconColor: "rgb(165, 129, 230)",
    //   noDataImage: Bardata,
    //   component: DynamicBarGraph,
    //   additionalClassName: "bigger-title",
    //   colors: ["#2AB9C6"],
    // },
  ],
};
