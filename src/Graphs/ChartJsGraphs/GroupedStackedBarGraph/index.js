import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { formatNumber, getIsGreen } from "../../../utils";
import { BarGraphWrapper, TooltipWrapper } from "./index.sc";
import { NewTooltip } from "../../../components/GraphTooltip";

const initialGraphData = {
  labels: [],
  datasets: [],
};

const GroupedStackedBarChart = ({
  data: barData,
  selectedCountryName,
  fixedTooltip = true,
  arrowIndicatorPosition = 18,
}) => {
  const [graphState, setGraphState] = useState({ ...initialGraphData });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [showTooltipImmediately, setShowTooltipImmediately] = useState(false);
  const [hoveredIndexData, setHoveredIndexData] = useState();

  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const highlightIndex = barData?.data.findIndex(
    (item) => item.label === barData.latestYear
  );
  const [activeIndex, setActiveIndex] = useState(highlightIndex);
  const underLineInHighlight = {
    id: "underLineInHighlight",

    afterDatasetsDraw(chart, args) {
      const { ctx } = chart;
      ctx.save();
      // const xPos = chart.getDatasetMeta(0)?.data[highlightIndex]?.x - 1;
      var xAxisScale = chart.scales["x"];

      const xPos = xAxisScale?.getPixelForTick(highlightIndex) - 1;
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
      const noOfDataSets = barData?.items?.length;
      const setActiveElementsConfig = [];

      for (let i = 0; i < noOfDataSets; i++) {
        setActiveElementsConfig.push({
          datasetIndex: i,
          index: activeIndex || highlightIndex,
        });
      }

      tooltip.setActiveElements(setActiveElementsConfig, {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top - chartArea.bottom) / 2,
      });
    }

    chart.update();
  }
  useEffect(() => {
    const obj = {
      labels: [],
      datasets: [],
    };
    barData?.items?.forEach((item, i) => {
      obj.datasets.push({
        label: barData?.items[i],
        data: [],
        borderColor: "#fff",
        backgroundColor: barData?.colors[i],
        borderWidth: 1,
        fill: "origin",
        stack: barData?.stack ? `Stack${barData?.stack[i]}` : `Stack${i}`,

        barThickness: 15,
        // maxBarThickness: 15,

        minBarLength: 2,
        skipNull: true,
      });
    });
    const labelsLen = barData?.items?.length;

    barData?.data?.forEach((ele, i) => {
      obj.labels.push(ele?.label);

      for (let j = 0; j < labelsLen; j++) {
        const dataKey = `value${j}`;
        obj.datasets[j]["data"].push(ele[dataKey]);
      }
    });
    setGraphState(obj);
  }, [barData]);

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
  }, [barData]);

  const options = {
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
    scales: {
      x: {
        stacked: true,
        group: "grouped",

        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            const xLabel = graphState?.labels[index];
            if (barData.xAxisKey === "month") {
              return xLabel.slice(0, 3);
            }

            if (index === 0) {
              return xLabel;
            } else {
              return xLabel?.substring(2);
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
        grid: {
          color: "#F5F5F5",
        },
        ticks: {
          callback: function (value, index, values) {
            return formatNumber(value);
          },

          color: "#000",
          font: {
            size: 8,
            weight: 500,
            lineHeight: "normal",
            family: "Inter",
          },
        },
        border: {
          display: false,
        },
        stacked: true,
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
                    colors: ele?.dataset?.backgroundColor,
                    unit: barData?.unit,
                    subValue: ele?.raw,
                    change: barData?.data[hoveredIndex][`yearly_change${i}`],
                    direction: barData?.data[hoveredIndex][`yearly_change${i}`],
                    isGreen: getIsGreen(
                      barData?.isPositive,
                      barData?.data[hoveredIndex][`yearly_change${i}`]
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
      datalabels: {
        color: "black", // set the color of the labels
        anchor: "end",
        align: "end",
        font: {
          weight: "bold",
        },
      },
    },
  };

  useEffect(() => {
    // Check whether to show tooltip immediately or after a delay
    if (showTooltipImmediately) {
      triggerTooltip();
    }
  }, [showTooltipImmediately]);

  return (
    <BarGraphWrapper>
      {" "}
      <Bar
        ref={chartRef}
        data={graphState}
        options={options}
        plugins={[underLineInHighlight]}
        height="100%"
        width="100%"
      />
      <TooltipWrapper
        ref={tooltipRef}
        tooltipPos={tooltipPos}
        isVisible={tooltipVisible}
        isData={tooltipData}
        hoveredIndex={hoveredIndexData}
        lastDataIndex={barData?.data?.length - 1}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip
            tooltipData={tooltipData}
            showTotal={barData.showTotalInTooltip || false}
          />
        )}
      </TooltipWrapper>
    </BarGraphWrapper>
  );
};

export default GroupedStackedBarChart;
