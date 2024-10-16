import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart } from "react-chartjs-2";
import { TooltipWrapper, TreeMapWrapper } from "./index.sc";
import { useEffect, useRef, useState } from "react";
import { formatNumber, getIsGreen } from "../../../utils";
import { NewTooltip } from "../../../components/GraphTooltip";
import chroma from "chroma-js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TreemapController,
  TreemapElement
);

export default function TreeMapGraph({
  data: treeMapData,
  selectedCountryName,
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const option = {
    maintainAspectRatio: false, // Disable the default aspect ratio
    responsive: true,
    plugins: {
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
            // fixedTooltip && triggerTooltip();
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
            const tooltipConWidth = tooltipRef?.current?.offsetWidth;
            const tooltipConHeight = tooltipRef?.current?.offsetHeight;
            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;

            const left = positionX + tooltipModel.caretX;
            const adjustedLeft =
              hoveredIndex === 0
                ? left - tooltipConWidth / 2 + 15
                : left - tooltipConWidth / 2;
            const top =  tooltipModel?.dataPoints.length &&
              tooltipModel?.dataPoints[0]?.element?.y - tooltipConHeight - 7;
            const ele = tooltipModel?.dataPoints[0];
            const dataIndex = ele?.dataIndex;
            const data = ele?.dataset?.data[dataIndex]?._data;

            const value = data?.value;
            const subValue = data?.subValue;
            const isGreen = data?.isGreen;
            const what = data?.what;

            const tooltipDetails = {
              header: {
                title: what,
                secondaryTitle: treeMapData?.data?.year,
              },
              body: {
                value: value,
                subValue: subValue,
                isGreen: isGreen,
                unit: treeMapData?.unit,
              },
            };
            // handle tooltip multiple rerender
            if (tooltipPos?.top !== top || tooltipPos?.left !== adjustedLeft) {
              setTooltipPos({ top: top, left: adjustedLeft });
              setTooltipData(tooltipDetails);
            }
          }
        },
      },
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const treemapGraphData = treeMapData?.items?.map(
      (ele, i) => {
        return {
          what: ele,
          value: treeMapData.data[`value${i}`] || 0,
          color: treeMapData.colors[i],
          subValue: treeMapData.data[`yearly_change${i}`] || 0,
          isGreen: getIsGreen(
            treeMapData?.isPositive,
            treeMapData.data[`yearly_change${i}`]
          ),
        };
      },
      [treeMapData]
    );
    const data = {
      datasets: [
        {
          label: "Supply Quantity",
          tree: treemapGraphData,
          key: "value",
          borderWidth: 0,
          borderRadius: 0,
          spacing: 0,
          backgroundColor(ctx) {
            if (ctx.type !== "data") {
              return "transparent";
            }
            return ctx.raw._data.color;
          },
          labels: {
            align: "left",
            display: true,
            overflow: "hidden",
            formatter(ctx) {
              if (ctx.type !== "data") {
                return;
              }
              return [
                ctx.raw._data.what,
                formatNumber(ctx.raw._data.value) + treeMapData?.unit,
              ];
            },
            color: (ctx) => {
              const bgColor = chroma(ctx.raw._data.color);

              // Use chroma-js to get the luminance directly
              const luminance = bgColor.luminance();

              return luminance > 0.5 ? "black" : "white";
            },
            font: [
              { size: 10, weight: 400 },
              { size: 14, weight: 400 },
            ],
            position: "top",
            padding: 12,
          },
        },
      ],
    };
    setGraphData(data);
  }, [treeMapData]);
  return (
    <TreeMapWrapper>
      <Chart
        ref={chartRef}
        type="treemap"
        width="100%"
        height="100%"
        data={graphData}
        options={{ ...option }}
      />
      <TooltipWrapper
        ref={tooltipRef}
        tooltipPos={tooltipPos}
        isVisible={tooltipVisible}
        isData={tooltipData}
      >
        {tooltipVisible && tooltipData && (
          <NewTooltip tooltipData={tooltipData} />
        )}
      </TooltipWrapper>
    </TreeMapWrapper>
  );
}
