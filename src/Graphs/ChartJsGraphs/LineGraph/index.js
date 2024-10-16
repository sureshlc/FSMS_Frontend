import React, { useCallback, useEffect, useRef, useState } from "react";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LineGraph, TooltipWrapper } from "./index.sc";
import { formatNumber, getIsGreen } from "../../../utils";
import { graphOpacityHandler } from "../../utils/graphOpacityHandler";
import { NewTooltip } from "../../../components/GraphTooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
);

const DynamicLine = ({
  data,
  config,
  selectedCountryName,
  fixedTooltip = true,
  arrowIndicatorPosition = 18,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoveredIndexData, setHoveredIndexData] = useState();
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const updatedConfig = {
    ...config,
    pointBackgroundColor: "rgb(255,255,255,1)",
    pointBorderColor: (ctx) => {
      return ctx.index > highlightIndex
        ? "rgba(34, 185, 255, 0.25)"
        : data.colors[0];
    },
  };

  const LOWER_THRESHOLD = 50;
  const UPPER_THRESHOLD = 100;
  // const currentYear = new Date().getFullYear();
  const dataForLineGraph = data.data.map((ele) => ele.value);
  const labels = data.data.map((ele) => ele.label);
  const highlightIndex = data?.data?.findIndex((item) =>
    item.month
      ? item.month === data?.latestMonth
      : item.label === data?.latestYear
  );

  const [activeIndex, setActiveIndex] = useState(highlightIndex);

  useEffect(() => {
    setActiveIndex(highlightIndex);
  }, [highlightIndex]);

  const resetTimer = useRef(null);

  const updateActiveIndex = useCallback(
    (newIndex) => {
      setActiveIndex(newIndex);

      clearTimeout(resetTimer.current);

      resetTimer.current = setTimeout(() => {
        setActiveIndex(highlightIndex);
      }, 3000);
    },
    [highlightIndex]
  );

  function triggerTooltip() {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const tooltip = chart.tooltip;

    if (
      (activeIndex || highlightIndex) === -1 ||
      activeIndex > data?.data?.length - 1
    ) {
      setTooltipVisible(false);
      tooltip.setActiveElements([], { x: 0, y: 0 });
      return;
    }
    if (tooltip.getActiveElements().length > 0) {
      tooltip.setActiveElements([], { x: 0, y: 0 });
    } else {
      const chartArea = chart.chartArea;

      tooltip.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: activeIndex || highlightIndex,
          },
        ],
        {
          x: (chartArea.left + chartArea.right) / 2,
          y: (chartArea.top + chartArea.bottom) / 2,
        }
      );
    }

    chart.update();
  }
  const underLineInHighlight = {
    id: "underLineInHighlight",
    afterDatasetsDraw(chart, args) {
      const { ctx } = chart;
      ctx.save();

      const metaData = chart.getDatasetMeta(0);
      const point = metaData.data[highlightIndex];

      if (!point) {
        ctx.restore();
        return;
      }

      const label = chart.data.labels[highlightIndex];
      ctx.font = ChartJS.defaults.font.toString();
      const textWidth = ctx.measureText(label).width;

      const xPos = point.x;
      const yPos = chart.chartArea.bottom;
      const lineStart = xPos - textWidth / 2;
      const lineEnd = xPos + textWidth / 2;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(lineStart, yPos + 22);
      ctx.lineTo(lineEnd, yPos + 22);
      ctx.stroke();
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
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
      tooltip: {
        enabled: false,
        position: "nearest",
        xAlign: "center",
        // function defined here itself because of re-rendering issue (chartjs)
        external: function (context) {
          const tooltipModel = context?.tooltip;
          // if chart is not defined, return early
          const chart = chartRef.current;
          if (!chart) {
            return;
          }
          // hide the tooltip when chartjs determines you've hovered out
          if (tooltipModel?.opacity === 0) {
            setTooltipVisible(false);
            fixedTooltip && triggerTooltip();
            return;
          }
          const canvas = chart.canvas;
          if (canvas) {
            // enable tooltip visibilty
            setTooltipVisible(true);

            // set position of tooltip
            // const left = tooltipModel.x - 20;
            // const top = tooltipModel.y;
            const hoveredIndex = tooltipModel?.dataPoints[0]?.dataIndex;
            setHoveredIndexData(hoveredIndex);
            const lastDataIndex = data?.data?.length - 1;
            const tooltipConWidth = tooltipRef?.current?.offsetWidth;

            const tooltipConHeight = tooltipRef?.current?.offsetHeight + 5;
            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;
            const left = positionX + tooltipModel.caretX;
            const adjustedLeft =
              hoveredIndex === 0
                ? left - tooltipConWidth / 7
                : hoveredIndex === lastDataIndex
                ? left - tooltipConWidth / 1.35
                : left - tooltipConWidth / 2;
            const top = positionY + tooltipModel.caretY - tooltipConHeight - 6;

            const tooltipDetails = {
              header: {
                title: selectedCountryName,
                secondaryTitle: tooltipModel?.dataPoints[0]?.label,
              },
              body: {
                value: tooltipModel?.dataPoints[0]?.raw,
                unit: data?.unit,
                subValue:
                  data?.data[hoveredIndex]?.yearly_change ||
                  data?.data[hoveredIndex]?.monthly_change,
                isGreen: getIsGreen(
                  data?.isPositive,
                  data?.data[hoveredIndex]?.yearly_change ||
                    data?.data[hoveredIndex]?.monthly_change
                ),
              },
            };

            if (tooltipPos?.top !== top || tooltipPos?.left !== adjustedLeft) {
              setTooltipPos({ top: top, left: adjustedLeft });
              setTooltipData(tooltipDetails);
              updateActiveIndex(hoveredIndex);
            }
          }
        },
      },
      // annotation: {
      //   clip: false,
      //   annotations: {
      //     line1: {
      //       type: "line",
      //       yMin: 100,
      //       yMax: 100,

      //       borderColor: "#EE4242",
      //       borderWidth: 2,
      //       borderDash: [4, 4],
      //       label: {
      //         display: true,
      //         content: 100,
      //         position: "start",
      //         backgroundColor: "#FF0000",
      //         borderRadius: 2,

      //         font: {
      //           size: 10,
      //           weight: 400,
      //         },
      //         color: "#fff",
      //         yAdjust: 0,
      //         xAdjust: -35,
      //       },
      //     },
      //   },
      // },
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    scales: {
      x: {
        grid: {
          color: function (context) {
            return context.index === activeIndex ? "#414141" : "#CECECE";
          },
          lineWidth: 1,
          tickColor: "#fff",
        },
        border: {
          dash: [4, 3],
        },
        ticks: {
          callback: function (value, index) {
            const stringValue = labels[index];
            if (data.xAxisKey === "month") {
              return stringValue;
            }
            if (index === 0) {
              return stringValue;
            } else {
              return stringValue; //?.substring(2); //2024_10_02
            }
          },
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          maxTicksLimit: 15,
          color: "#000",
          font: {
            size: 8,
            weight: (context) => {
              return context.tick.value === highlightIndex ? "800" : "400";
            },
            lineHeight: "normal",
            family: "Inter",
          },
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 8,
          callback: function (value) {
            console.log("Data :", value);
            /*if (value % 1 === 0) {	//2024_10_02: Show y-axis even for units less than 1
              // Check if the value is an integer
              return value;
            }*/
            return value;
          },
          color: "#000",
          font: {
            size: 8,
            weight: 500,
            lineHeight: "normal",
            family: "Inter",
          },
        },
        grid: {
          display: true,
          tickColor: "#fff",
        },
        border: {
          dash: [4, 3],
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
      onHover: (e, item) => {},
    },
  };

  const dataForGraph = {
    labels: labels,
    datasets: [
      {
        label: config?.selectedTabLabel,
        data: dataForLineGraph,
        fill: false,
        segment: {
          borderColor: (ctx) => {
            return data?.data[ctx.p1DataIndex].isForecast
              ? "rgba(34, 185, 255, 0.25)"
              : data.colors[0];
          },
        },
        borderWidth: 4,
        tension: 0.1,
        highlightIndex,
        pointBackgroundColor:
          typeof updatedConfig.pointBackgroundColor === "string"
            ? updatedConfig.pointBackgroundColor
            : (context) => {
                return dataForLineGraph?.map((value) => {
                  if (value < LOWER_THRESHOLD) {
                    return graphOpacityHandler(
                      "#FE7979",
                      data?.data[context.dataIndex].isForecast
                    );
                  } else if (
                    value >= LOWER_THRESHOLD &&
                    value < UPPER_THRESHOLD
                  ) {
                    return "#FAF2DF";
                  } else {
                    return graphOpacityHandler(
                      "#A8DDB5",
                      data?.data[context.dataIndex].isForecast
                    );
                  }
                });
              },
        pointBorderColor: typeof updatedConfig.pointBorderColor
          ? updatedConfig.pointBorderColor
          : (context) => {
              return dataForLineGraph?.map((value) => {
                if (value < LOWER_THRESHOLD) {
                  return graphOpacityHandler("#EA3333", context);
                } else if (
                  value >= LOWER_THRESHOLD &&
                  value < UPPER_THRESHOLD
                ) {
                  return graphOpacityHandler("#EECB74", context);
                } else {
                  return graphOpacityHandler("#6EB580", context);
                }
              });
            },
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    const tooltipTimeout = setTimeout(() => {
      if (fixedTooltip) {
        triggerTooltip();
      }
    }, 800);
    return () => {
      clearTimeout(tooltipTimeout);
    };
  }, [data]);

  return (
    <LineGraph>
      <Line
        ref={chartRef}
        data={dataForGraph}
        options={options}
        plugins={[underLineInHighlight]}
        width="100%"
        height="100%"
        onMouseOut={() => {
          updateActiveIndex(highlightIndex);
        }}
      />
      <TooltipWrapper
        ref={tooltipRef}
        tooltipPos={tooltipPos}
        isVisible={tooltipVisible}
        isData={tooltipData}
        hoveredIndex={hoveredIndexData}
        lastDataIndex={data?.data?.length - 1}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip tooltipData={tooltipData} />
        )}
      </TooltipWrapper>
      {/* )} */}
    </LineGraph>
  );
};

export default DynamicLine;
