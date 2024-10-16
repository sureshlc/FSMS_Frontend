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

// import { style } from "d3";

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

const ReusableMultilineGraph = ({
  data,
  config,
  selectedCountryName,
  fixedTooltip = true,
  arrowIndicatorPosition = 18,
  showTotalInTooltip = true,
}) => {
  const [graphState, setGraphState] = useState({
    labels: [],
    datasets: [],
  });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoveredIndexData, setHoveredIndexData] = useState();
  const [showTooltipImmediately, setShowTooltipImmediately] = useState(false);

  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  // const currentYear = new Date().getFullYear();
  const dataForLineGraph = data.data.map((ele) => ele.value);
  const labels = data.data.map((ele) => ele.label);

  const highlightIndex = data?.data?.findIndex((item) =>
    item.month
      ? item.month === data?.latestMonth
      : item.label === data?.latestYear
  );

  const [activeIndex, setActiveIndex] = useState(highlightIndex);
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
      const setActiveElementsConfig = [];

      for (let i = 0; i < graphState?.datasets?.length; i++) {
        const isValid = !graphState?.datasets[i]?.data?.includes(undefined);
        if (isValid) {
          setActiveElementsConfig.push({
            datasetIndex: i,
            index: activeIndex || highlightIndex,
          });
        }
      }

      tooltip.setActiveElements(setActiveElementsConfig, {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top - chartArea.bottom) / 2,
      });
    }

    chart.update();
  }

  const underLineInHighlight = {
    id: "underLineInHighlight",

    afterDatasetsDraw(chart, args) {
      const { ctx } = chart;
      ctx.save();
      const xPos = chart.getDatasetMeta(0)?.data[highlightIndex]?.x - 1;
      const yPos = chart.chartArea.bottom;
      // const width = chart.getDatasetMeta(0)?.data[highlightIndex]?.width;

      const width = data.latestMonth ? 30 : data.is3YearAverage ? 35 : 10;

      ctx.lineWidth = 2;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.moveTo(xPos - width / 2 - 2, yPos + 22); // Adjust the position of the line
      ctx.lineTo(xPos + width / 2 + 4, yPos + 22); // Adjust the position of the line
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
        xAlign: "right",
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
            // enable tooltip visibility
            setTooltipVisible(true);

            // set position of tooltip
            const lastDataIndex = data?.data?.length - 1;
            const hoveredIndex = tooltipModel?.dataPoints[0]?.dataIndex;
            setHoveredIndexData(hoveredIndex);
            const tooltipConWidth = tooltipRef?.current?.offsetWidth;

            const tooltipConHeight =
              tooltipRef?.current?.offsetHeight ||
              (tooltipData?.body?.data.length === 1 ? 53 : 72);

            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;
            const left = positionX + tooltipModel.caretX;
            const adjustedLeft =
              hoveredIndex === 0
                ? left - tooltipConWidth / 7
                : hoveredIndex === lastDataIndex
                ? left - tooltipConWidth / 1.3
                : left - tooltipConWidth / 2;
            const allCaretY = tooltipModel.dataPoints.map(
              (point) => point.element.y
            );
            const topbarvalue = Math.min(...allCaretY);
            const top = positionY + topbarvalue - tooltipConHeight - 7;
            const tooltipDetails = {
              header: {
                title: selectedCountryName,
                secondaryTitle: tooltipModel?.dataPoints[0]?.label,
              },
              body: {
                data: tooltipModel.dataPoints?.map((ele, i) => {
                  return {
                    value: ele?.dataset?.label,
                    colors: ele.element.options.borderColor,
                    subValue: ele?.raw,
                    unit: data?.unit,
                    change:
                      data?.data[hoveredIndex][
                        `yearly_change${ele?.datasetIndex}`
                      ],
                    direction:
                      data?.data[hoveredIndex][
                        `yearly_change${ele?.datasetIndex}`
                      ],
                    isGreen: getIsGreen(
                      data?.isPositive,
                      data?.data[hoveredIndex][
                        `yearly_change${ele?.datasetIndex}`
                      ]
                    ),
                  };
                }),
              },
            };
            // handle tooltip multiple rerender
            if (tooltipPos?.top !== top || tooltipPos?.left !== adjustedLeft) {
              setTooltipPos({ top: top, left: adjustedLeft });
              setTooltipData(tooltipDetails);
              updateActiveIndex(hoveredIndex);
            }
          }
        },
      },
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    scales: {
      x: {
        grid: {
          color: function (context) {
            return context.index === activeIndex ? "#414141" : "#CECECE";
          },
          lineWidth: 1,
          drawTicks: true,
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
          callback: function (value, index, values) {
            const formattedValue = parseFloat(value).toFixed(2);
            return formattedValue.endsWith(".00")
              ? formatNumber(parseInt(value))
              : formatNumber(formattedValue);
          },
          stepSize: 5,
          maxTicksLimit: 10,
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

  useEffect(() => {
    const multiLineDataset = data.items.map((ele, idx) => {
      return {
        label: ele,
        data: data.data.map((dataPoint) => {
          const value = dataPoint["value" + idx];
          return value === undefined || value === null ? 0 : value;
        }),
        fill: false,
        spanGaps: false,
        segment: {
          borderColor: (ctx) => {
            return data?.colors[idx];
          },
        },
        borderWidth: 4,
        tension: 0.1,
        unit: data?.unit,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        pointBorderColor: (ctx) => {
          return data?.colors[idx];
        },
        pointBackgroundColor: "#fff",
      };
    });

    const dataForGraph = {
      labels: labels,
      datasets: multiLineDataset,
    };
    setGraphState(dataForGraph);
  }, [data]);

  // useEffect(() => {
  //   const tooltipTimeout = setTimeout(() => {
  //     if (fixedTooltip) {
  //       triggerTooltip();
  //     }
  //   }, 800);

  //   return () => {
  //     clearTimeout(tooltipTimeout);
  //   };
  // }, [data]);
  useEffect(() => {
    const tooltipTimeout = setTimeout(() => {
      if (fixedTooltip) {
        setShowTooltipImmediately(true);
        triggerTooltip();
      }
    }, 800);

    return () => {
      clearTimeout(tooltipTimeout);
    };
  }, [data]);

  useEffect(() => {
    // Check whether to show tooltip immediately or after a delay
    if (showTooltipImmediately) {
      triggerTooltip();
    }
  }, [showTooltipImmediately]);

  return (
    <LineGraph>
      <Line
        ref={chartRef}
        data={graphState}
        options={options}
        plugins={[underLineInHighlight]}
        width="100%"
        height="100%"
        onMouseOut={() => {
          updateActiveIndex(highlightIndex);
        }}
      />
      {/* {tooltipVisible && tooltipData && ( */}
      <TooltipWrapper
        ref={tooltipRef}
        tooltipPos={tooltipPos}
        isVisible={tooltipVisible}
        isData={tooltipData}
        hoveredIndex={hoveredIndexData}
        lastDataIndex={data?.data?.length - 1}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip
            tooltipData={tooltipData}
            label={data?.title}
            showTotal={data.showTotalInTooltip || false}
          />
        )}
      </TooltipWrapper>
      {/* )} */}
    </LineGraph>
  );
};

export default ReusableMultilineGraph;
