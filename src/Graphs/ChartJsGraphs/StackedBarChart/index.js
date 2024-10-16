import React, { useEffect, useRef, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { formatNumber, getIsGreen } from "../../../utils";
import { BarGraphWrapper, TooltipWrapper } from "./index.sc";
import { NewTooltip } from "../../../components/GraphTooltip";

const initialLineData = {
  labels: [],
  datasets: [],
};

const StackedBarChart = ({
  data: barData,
  selectedCountryName,
  fixedTooltip = true,
  arrowIndicatorPosition = 18,
}) => {
  const [graphState, setGraphState] = useState({ ...initialLineData });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoveredIndexData, setHoveredIndexData] = useState();
  const [showTooltipImmediately, setShowTooltipImmediately] = useState(false);

  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const highlightIndex = barData?.data.findIndex((item) =>
    item.month
      ? item.month === barData?.latestMonth
      : item.label === barData?.latestYear
  );

  const isAllNegative = (dataPoints) => {
    if (!dataPoints) return false;
    for (let i = 0; i < dataPoints.length; i++) {
      if (dataPoints[i].raw > 0) {
        return false;
      }
    }
    return true;
  };

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
  const underLineInHighlight = {
    id: "underLineInHighlight",

    afterDatasetsDraw(chart, args) {
      const { ctx } = chart;
      ctx.save();

      const xPos =
        chart.getDatasetMeta(0)?.data[
          chart?.data?.datasets[0]?.highlightIndex ?? highlightIndex
        ]?.x - 1;
      const yPos = chart.chartArea.bottom;

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
    barData?.items?.forEach((item, idx) => {
      obj.datasets.push({
        label: item,
        data: [],
        borderColor: barData?.colors[idx],
        backgroundColor: barData.colors[idx],
        borderWidth: 1,
        fill: "origin",
        unit: barData?.unit,
        barPercentage: 0.5,
        barThickness: 15,
        highlightIndex,
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
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        stacked: true,
        ticks: {
          callback: function (value, index, values) {
            const xLabel = graphState?.labels[index];
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
        grace: "15%",
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
          const startingYAxisPosition = chart.scales.y.getPixelForValue(0);
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
            const top = isAllNegative(tooltipModel?.dataPoints)
              ? startingYAxisPosition - tooltipConHeight - 8
              : positionY + topbarvalue - tooltipConHeight - 7;
            const tooltipDetails = {
              header: {
                title: selectedCountryName,
                secondaryTitle: tooltipModel?.dataPoints[0]?.label,
              },
              body: {
                data: tooltipModel.dataPoints
                  ?.map((ele, i) => {
                    return {
                      value: ele?.dataset?.label,
                      colors: ele?.dataset?.backgroundColor,
                      subValue: ele?.raw,
                      unit: ele?.dataset?.unit,
                      change: barData?.data[hoveredIndex][`yearly_change${i}`],
                      direction:
                        barData?.data[hoveredIndex][`yearly_change${i}`],
                      isGreen: getIsGreen(
                        barData?.isPositive,
                        barData?.data[hoveredIndex][`yearly_change${i}`]
                      ),
                    };
                  })
                  .reverse(),
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
        setShowTooltipImmediately(true);
        triggerTooltip();
      }
    }, 800);

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
  return (
    <BarGraphWrapper>
      <Bar
        ref={chartRef}
        data={graphState}
        options={options}
        plugins={[underLineInHighlight]}
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
        lastDataIndex={barData?.data?.length - 1}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip
            tooltipData={tooltipData}
            label={barData?.label}
            showTotal={barData.showTotalInTooltip || false}
          />
        )}
      </TooltipWrapper>
    </BarGraphWrapper>
  );
};

export default StackedBarChart;
