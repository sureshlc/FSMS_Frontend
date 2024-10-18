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
import { Bar } from "react-chartjs-2";
import { BarGraphWrapper, TooltipWrapper } from "./index.sc";
import { getBarColorAccordingToValue } from "../../../components/Layout/FIrst/overviewsecondlayout/seconlayoutbox/utils";
import { getIndicatorLineGraphConfig } from "../../../components/Layout/FIrst/overviewfirstlayout/utils";
import { graphOpacityHandler } from "../../utils/graphOpacityHandler";
import { NewTooltip } from "../../../components/GraphTooltip";
import { getGraphConfig } from "./helper";
import { getIsGreen } from "../../../utils";

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

const initialLineData = {
  labels: [],
  datasets: [],
};

const DynamicBarGraph = ({
  data: barData,
  config = {},
  selectedCountryName,
  barPercentage = 0.5,
  arrowIndicatorPosition = 18,
  color = "",
  barThickness = 15,
  fixedTooltip = true,
  isTrend = false,
  padding,
}) => {
  const [graphState, setGraphState] = useState({ ...initialLineData });
  const [showTooltipImmediately, setShowTooltipImmediately] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoveredIndexData, setHoveredIndexData] = useState();
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const highlightIndex = barData?.data.findIndex((item) =>
    item.month
      ? item.month === barData?.latestMonth
      : item.label === barData?.latestYear
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

  useEffect(() => {
    updateActiveIndex(highlightIndex);
  }, [highlightIndex]);

  function triggerTooltip() {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const tooltip = chart.tooltip;
    if (
      (activeIndex || highlightIndex) === -1 ||
      activeIndex > barData?.data?.length - 1
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
      const xPos = chart.getDatasetMeta(0)?.data[highlightIndex]?.x - 1;
      const yPos = chart.chartArea.bottom;
      // const width = chart.getDatasetMeta(0)?.data[highlightIndex]?.width;
      const width = barData.latestMonth ? 30 : barData.is3YearAverage ? 35 : 10;

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

  useEffect(() => {
    const tooltipTimeout = setTimeout(() => {
      if (fixedTooltip) {
        setShowTooltipImmediately(true);
        triggerTooltip();
      }
    }, 1000);

    return () => {
      clearTimeout(tooltipTimeout);
    };
  }, [barData]);

  useEffect(() => {
    // Check whether to show tooltip immediately or after a delay
    if (showTooltipImmediately) {
      triggerTooltip();
    }
  }, [showTooltipImmediately]);

  useEffect(() => {
    const data = [];
    const labels = [];

    const { isPositive } = barData;

    barData?.data?.forEach((ele) => {
      data.push(ele.value);
      labels.push(ele.label);
    });

    const dataForBarGraph = {
      labels: labels,
      datasets: [
        {
          label: selectedCountryName,
          data: data,
          fill: false,
          backgroundColor: (context) => {
            return data?.map((value) => {
              const isForecast =
                barData?.data[context.dataIndex]?.isForecast || false;
              if ((color || barData?.colors?.length) && isForecast) {
                return graphOpacityHandler(
                  color || barData?.colors[0],
                  barData?.data[context.dataIndex]?.isForecast
                );
              } else {
                return (
                  (barData?.colors?.length &&
                    barData?.colors &&
                    barData?.colors[0]) ||
                  color ||
                  getBarColorAccordingToValue(
                    value,
                    barData?.threshold,
                    isPositive,
                    isForecast
                  ) ||
                  "grey"
                );
              }
            });
          },

          barPercentage,
          categoryPercentage: 0.8,
          order: 1,
          barThickness,
        },
      ],
      latestYearForArrowIndicator: barData?.latestYear,
      threshold: barData?.threshold,
    };
    setGraphState(dataForBarGraph);
  }, [barData]);

  const customXTickConfig = {
    ticks: {
      callback: function (value, index, values) {
        const xLabel = graphState?.labels[index];
        if (barData.xAxisKey === "month") {
          return xLabel;
        }

        if (index === 0) {
          return xLabel;
        } else {
          return xLabel?.substring(2);
        }
      },
    },
  };

  const graphConfig = getIndicatorLineGraphConfig(
    graphState?.threshold,
    padding
  );

  const values = barData.data.map((item) => item.value);
  const upperValue = Math.max(...values);

  const calculateGrace = (value) => {
    if (value < 100) {
      return "20%";
    } else if (value < 1000) {
      return "25%";
    } else {
      return "30%";
    }
  };

  const finalGraphConfig = {
    ...graphConfig,
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],

    scales: {
      ...graphConfig?.scales,
      x: {
        ...(isTrend ? { display: false } : {}),
        ...graphConfig?.scales?.x,
        ticks: {
          ...graphConfig?.scales?.x?.ticks,
          ...customXTickConfig.ticks,
          font: {
            ...graphConfig?.scales?.x?.ticks?.font,
            weight: (context) => {
              return context.tick.value === highlightIndex ? "800" : "400";
            },
          },
        },
      },
      y: {
        ...(isTrend ? { display: false } : {}),
        ...graphConfig?.scales?.y,
        grace: calculateGrace(upperValue),
      },
    },
    plugins: {
      ...graphConfig?.plugins,

      tooltip: {
        enabled: false,
        position: "nearest",
        xAlign: "center",
        // yAlign: "top",
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
            // const left = tooltipModel.x;
            // const top = tooltipModel.y;
            const hoveredIndex = tooltipModel?.dataPoints[0]?.dataIndex;
            setHoveredIndexData(hoveredIndex);
            const lastDataIndex = barData?.data?.length - 1;

            const tooltipConWidth = tooltipRef?.current?.offsetWidth;
            const tooltipConHeight = tooltipRef?.current?.offsetHeight;
            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;
            const left = positionX + tooltipModel.caretX;
            const adjustedLeft =
              hoveredIndex === 0
                ? left - tooltipConWidth / 7
                : hoveredIndex === lastDataIndex
                ? left - tooltipConWidth / 1.3
                : left - tooltipConWidth / 2;
            const top = positionY + tooltipModel.caretY - tooltipConHeight - 7;

            const tooltipDetails = {
              header: {
                title: selectedCountryName,
                secondaryTitle: tooltipModel?.dataPoints[0]?.label,
              },
              body: {
                value: tooltipModel?.dataPoints[0]?.raw,
                unit: barData?.unit,
                subValue:
                  barData?.data[hoveredIndex]?.yearly_change ||
                  barData?.data[hoveredIndex]?.monthly_change,
                isGreen: getIsGreen(
                  barData?.isPositive,
                  barData?.data[hoveredIndex]?.yearly_change ||
                    barData?.data[hoveredIndex]?.monthly_change
                ),
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
  }, [barData]);

  return (
    <BarGraphWrapper>
      <Bar
        ref={chartRef}
        data={graphState}
        options={Object.keys(config).length > 0 ? config : finalGraphConfig}
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
        lastDataIndex={barData?.data?.length - 1}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip tooltipData={tooltipData} />
        )}
      </TooltipWrapper>
      {/* )} */}
    </BarGraphWrapper>
  );
};

export default DynamicBarGraph;
