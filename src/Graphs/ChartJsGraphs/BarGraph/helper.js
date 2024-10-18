export const indicatorLineGraphConfig = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 0,
      left: -3,
      right: 30,
      bottom: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    annotation: {
      clip: false,
      annotations: {
        line1: {
          type: "line",
          scaleID: "y",

          borderColor: "#EE4242",
          borderWidth: 1,
          borderDash: [2, 2],
          label: {
            display: true,
            content: 15,
            position: "end",
            backgroundColor: "#EE4242",
            borderRadius: 2,

            font: {
              size: 10,
              weight: 400,
            },
            color: "#fff",

            xAdjust: 35,
          },
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: false,
      },

      border: {
        color: "#DBE9F4",
      },

      ticks: {
        maxRotation: 0,
        minRotation: 0,
        display: true,

        color: "#000",
        font: {
          size: 8,
          weight: 500,
          lineHeight: "normal",
          family: "Inter",
        },
      },
    },
    y: {
      grid: {
        color: "#F5F5F5",
        lineWidth: 1,
        drawTicks: false,
      },

      //the max value should be 1.5 times the max value of the data
      // max: (context) => {
      //   // Find the maximum value dynamically
      //   const datasets = context.chart.data.datasets;
      //   const maxDataValue = Math.max(
      //     ...datasets.flatMap((dataset) => dataset.data)
      //   );

      //   return 1.5 * maxDataValue;
      // },

      min: 0,
      border: {
        color: "#DBE9F4",
        display: false,
      },

      ticks: {
        color: "#000",

        font: {
          size: 8,
          weight: 500,
          lineHeight: "normal",
          family: "Inter",
        },
      },
    },
  },
};

export const getGraphConfig = (threshold) => {
  return {
    ...indicatorLineGraphConfig,
    plugins: {
      ...indicatorLineGraphConfig.plugins,
      annotation: {
        ...indicatorLineGraphConfig.plugins.annotation,
        annotations: {
          ...indicatorLineGraphConfig.plugins.annotation.annotations,
          line1: {
            ...indicatorLineGraphConfig.plugins.annotation.annotations.line1,
            value: threshold,
            label: {
              ...indicatorLineGraphConfig.plugins.annotation.annotations.line1
                .label,
              content: threshold,
            },
          },
        },
      },
    },
  };
};

export const smallBarGraphConfigs = {
  responsive: true,
  maintainAspectRatio: false,
  fixedtooltip:false,
  layout: {
    padding: {
      top: 0,
      left: 0,
      right: 2,
      bottom: 5,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};
