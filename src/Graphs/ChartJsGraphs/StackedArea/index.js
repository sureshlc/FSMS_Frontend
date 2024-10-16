import React, { useCallback, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { formatNumber, getIsGreen } from "../../../utils";
import { NewTooltip } from "../../../components/GraphTooltip";
import { LineGraphWrapper, TooltipWrapper } from "./index.sc";

const initialLineData = {
  labels: [],
  datasets: [],
};

const StackedAreaChart = ({
  data: areaData = [],
  chartOptions,
  selectedCountryName,
  fixedTooltip = true,
  arrowIndicatorPosition = 18,
}) => {
  const [areaState, setAreaState] = useState({ ...initialLineData });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [hoveredIndexData, setHoveredIndexData] = useState();
  const [showTooltipImmediately, setShowTooltipImmediately] = useState(false);

  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const highlightIndex = areaData?.data.findIndex(
    (item) => item.label === areaData.latestYear
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
      activeIndex > areaData?.data?.length - 1
    ) {
      setTooltipVisible(false);
      tooltip.setActiveElements([], { x: 0, y: 0 });
      return;
    }

    if (tooltip.getActiveElements().length > 0) {
      tooltip.setActiveElements([], { x: 0, y: 0 });
    } else {
      const chartArea = chart.chartArea;
      const noOfDataSets = areaData?.items?.length;
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
  const underLineInHighlight = {
    id: "underLineInHighlight",

    afterDatasetsDraw(chart, args) {
      const { ctx } = chart;
      ctx.save();
      const xPos = chart.getDatasetMeta(0)?.data[highlightIndex]?.x - 1;
      const yPos = chart.chartArea.bottom;
      // const width = chart.getDatasetMeta(0)?.data[highlightIndex]?.width;

      const width = areaData.latestMonth
        ? 30
        : areaData.is3YearAverage
        ? 35
        : 10;

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
    const obj = {
      labels: [],
      datasets: [],
    };

    areaData?.items?.forEach((item, idx) => {
      obj.datasets.push({
        label: item,
        data: [],
        borderColor: areaData.colors[idx],
        backgroundColor: areaData.gradients
          ? (context) => {
              const {
                ctx,
                data,
                chartArea: { top, bottom },
              } = context.chart;

              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
              gradientBg.addColorStop(0, areaData.gradients[0]);
              gradientBg.addColorStop(1, areaData.gradients[1]);
              return gradientBg;
            }
          : [],
        pointStyle: "circle",
        pointBorderColor: "white",
        pointRadius: 5,
        pointBorderWidth: 2,
        z: 2,
        borderWidth: 1,
        drawBorder: false,
        radius: 0,
        fill: "origin",
      });
    });

    areaData?.data?.forEach((ele, i) => {
      obj.labels.push(ele?.year);

      areaData.items.forEach((label, index) => {
        const value =
          areaData.items.length === 1 ? ele.value : ele[`value${index}`];
        const backgroundColor = value
          ? areaData.colors[index]
          : "rgba(0, 0, 0, 0)";

        obj.datasets[index].data.push(value);
        if (areaData.gradients) return;
        obj.datasets[index].backgroundColor.push(backgroundColor);
      });
    });

    setAreaState({ ...obj, datasets: obj.datasets.reverse() });
  }, [areaData]);

  const thresholdValues = areaData.threshold || [];

  // Check if there are exactly two threshold values
  const hasTwoThresholds = thresholdValues?.length === 2;

  const annotationLines = hasTwoThresholds
    ? thresholdValues.map((threshold, index) => {
        const lineLabel = areaData.items[index];
        return {
          [`line${index + 1}`]: {
            type: "line",
            yMin: threshold || 0,
            yMax: threshold || 0,
            value: threshold || 0,
            borderColor: index === 0 ? "#007DAD" : "#EE4242",
            borderWidth: 0.5,
            borderDash: [4, 3],
            drawTime: "afterDatasetsDraw",
            label: {
              display: true,
              content: `${lineLabel} - ${threshold.toString()}`,
              position: "end",
              backgroundColor: "#FF0000",
              borderRadius: 2,

              font: {
                size: 10,
                weight: 400,
              },
              color: "#fff",
              yAdjust: 0,
              xAdjust: 6,
              z: 999,
            },
          },
        };
      })
    : [];

  const is2016 = areaData.data[0].year >= "2016";
  const line1 = annotationLines.length > 0 ? annotationLines[0].line1 : null;
  const line2 = annotationLines.length > 1 ? annotationLines[1].line2 : null;
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
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        position: "nearest",
        xAlign: "center",
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
            const lastDataIndex = areaData?.data?.length - 1;
            const secondLastDataIndex = areaData?.data?.length - 2;
            const tooltipConWidth = tooltipRef?.current?.offsetWidth;
            const tooltipConHeight = tooltipRef?.current?.offsetHeight;
            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;
            const left = positionX + tooltipModel.caretX;
            const adjustedLeft =
              hoveredIndex === 0
                ? left - tooltipConWidth / 7
                : hoveredIndex === secondLastDataIndex &&
                  areaData.label ===
                    "Share of agricultural land in land area by use"
                ? left - tooltipConWidth / 1.55
                : hoveredIndex === lastDataIndex
                ? left - tooltipConWidth / 1.21
                : left - tooltipConWidth / 2;
            const allCaretY = tooltipModel.dataPoints.map(
              (point) => point.element.y
            );
            const topbarvalue = Math.min(...allCaretY);
            const top = positionY + topbarvalue - tooltipConHeight - 13;
            const tooltipDetails = {
              header: {
                title: selectedCountryName,
                secondaryTitle: tooltipModel?.dataPoints[0]?.label,
              },
              body:
                areaData.items.length === 1
                  ? {
                      value: tooltipModel?.dataPoints[0]?.raw,
                      subValue: areaData?.data[hoveredIndex]?.yearly_change,
                      unit: areaData?.unit,
                      isGreen: getIsGreen(
                        areaData?.isPositive,
                        areaData?.data[hoveredIndex]?.yearly_change
                      ),
                    }
                  : {
                      data: tooltipModel.dataPoints[1]
                        ? areaData.items
                            ?.map((ele, i) => {
                              const data = tooltipModel.dataPoints[i];
                              return {
                                value: data?.dataset?.label || ele,
                                colors:
                                  data?.dataset?.borderColor ||
                                  areaData.colors[i],
                                subValue: data?.raw,
                                unit: areaData?.unit,
                                change:
                                  areaData?.data[hoveredIndex][
                                    `yearly_change${i}`
                                  ],
                                direction:
                                  areaData?.data[hoveredIndex][
                                    `yearly_change${i}`
                                  ],
                                isGreen: getIsGreen(
                                  areaData?.isPositive,
                                  areaData?.data[hoveredIndex][
                                    `yearly_change${i}`
                                  ]
                                ),
                              };
                            })
                            .reverse()
                        : areaData.items
                            ?.map((ele, i) => {
                              const data = tooltipModel.dataPoints[i];
                              return {
                                value: data?.dataset?.label || ele,
                                colors:
                                  data?.dataset?.borderColor ||
                                  areaData.colors[i],
                                subValue: data?.raw,
                                unit: data?.dataset?.unit,
                                direction:
                                  areaData?.data[hoveredIndex][
                                    `yearly_change${i}`
                                  ],
                                isGreen: getIsGreen(
                                  areaData?.isPositive,
                                  areaData?.data[hoveredIndex][
                                    `yearly_change${i}`
                                  ]
                                ),
                              };
                            })
                            .reverse(),
                      // data: tooltipModel.dataPoints?.map((ele, i) => {
                      //   return {
                      //     value: ele?.dataset?.label,
                      //     colors: ele?.dataset?.borderColor,
                      //     subValue: ele?.raw,
                      //     unit: ele?.dataset?.unit,
                      //     direction:
                      //       areaData?.data[hoveredIndex][`yearly_change${i}`],
                      //     isGreen: getIsGreen(
                      //       areaData?.isPositive,
                      //       areaData?.data[hoveredIndex][`yearly_change${i}`]
                      //     ),
                      //   };
                      // }),
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
        // labelColor: function (context) {
        //   return {
        //     borderColor: context.dataset.borderColor,
        //     backgroundColor: context.dataset.backgroundColor,
        //     borderWidth: 1,
        //   };
        // },
        // backgroundColor: "#000000",
        // titleColor: "#7B8092",
        // padding: {
        //   left: 15,
        //   right: 15,
        //   top: 10,
        //   bottom: 10,
        // },
        // titleFont: 500,
        // titleFontSize: 12,

        // labels: {
        //   font: {
        //     size: 12,
        //   },
        // },
      },
      // annotation: {
      //   clip: false,
      //   annotations: [
      //     ...(hasTwoThresholds && line1 ? [line1] : []),
      //     ...(hasTwoThresholds && line2 ? [line2] : []),
      //   ],
      // },
    },

    scales: {
      x: {
        type: "category",
        stacked: is2016 ? false : true,
        border: {
          dash: [4, 4],
        },
        grid: {
          color: "#fff",
          // Disable the default solid line
          drawBorder: false,
          borderDash: [4, 4],
          z: 1,
        },
        ticks: {
          callback: function (value, index, values) {
            const xLabel = areaState?.labels[index];
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
        min: 0,
        stacked: is2016 ? false : true,
        grid: {
          display: false,
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
  }, [areaData]);

  useEffect(() => {
    // Check whether to show tooltip immediately or after a delay
    if (showTooltipImmediately) {
      triggerTooltip();
    }
  }, [showTooltipImmediately]);

  return (
    <LineGraphWrapper>
      <Line
        ref={chartRef}
        data={areaState}
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
        lastDataIndex={areaData?.data?.length - 1}
        secondLastDataIndex={areaData?.data?.length - 2}
        is1dTooltip={!areaData?.is2dData}
        label={areaData.label}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip
            tooltipData={tooltipData}
            showTotal={areaData.showTotalInTooltip || false}
          />
        )}
      </TooltipWrapper>
    </LineGraphWrapper>
  );
};

export default StackedAreaChart;
