import { formatNumber } from "../../../../utils";

export const indicatorLineGraphConfig = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  layout: {
    padding: {
      top: 0,
      left: -3,
      right: 0,
      bottom: 10,
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
        drawTicks: true,
        tickColor: "#fff",
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

      border: {
        color: "#DBE9F4",
        display: false,
      },

      ticks: {
        callback: function (value, index, values) {
          const formattedValue = parseFloat(value).toFixed(2);
          return formattedValue.endsWith(".00")
            ? formatNumber(parseInt(value))
            : formatNumber(formattedValue);
        },
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

export const getIndicatorLineGraphConfig = (threshold, padding) => {
  if (threshold) {
    return {
      ...indicatorLineGraphConfig,
      layout: {
        padding: {
          top: 0,
          left: -3,
          right: 0,
          bottom: padding || 10,
        },
      },
      plugins: {
        ...indicatorLineGraphConfig.plugins,
        annotation: {
          ...indicatorLineGraphConfig.plugins.annotation,
          annotations: {
            ...indicatorLineGraphConfig.plugins.annotation.annotations,
            // line1: {
            //   ...indicatorLineGraphConfig.plugins.annotation.annotations.line1,
            //   value: threshold[0],
            //   label: {
            //     ...indicatorLineGraphConfig.plugins.annotation.annotations.line1
            //       .label,
            //     content: formatNumber(threshold[0]) + " Mean - dev",
            //   },
            // },
          },
        },
      },
    };
  } else {
    return {
      ...indicatorLineGraphConfig,
      layout: {
        padding: {
          top: 0,
          left: -3,
          right: 18,
          bottom: 0,
        },
      },
    };
  }
};
