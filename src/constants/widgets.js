// // import HorizontalMultiBar from "../components/horizontal-bar";
// import {
//   BigBubble,
//   CoolColumn,
//   GreatGuage,
//   LinearLine,
//   PieGraph,
//   Radar,
//   WordCloud,
//   RadialPieChart,
//   BestBar,
//   USMapChart,
//   WorldMapGraph,
//   CoolColumn3D,
// } from "../Graphs";
// import DynamicArea from "../Graphs/DynamicArea";
// import Linegraph from "../Graphs/LineGraph";
// import StackedBar from "../Graphs/StackedBar";
// import StackedAreaChart from "../Graphs/chartjs/StackedArea";
// import DynamicBarGraph from "../Graphs/ChartJsGraphs/BarGraph";

// import StackedBarChart from "../Graphs/ChartJsGraphs/StackedBarChart";
// import GroupedStackedBarChart from "../Graphs/ChartJsGraphs/GroupedStackedBarGraph";
// import DynamicLine from "../Graphs/ChartJsGraphs/LineGraph";
// import MultilineGraph from "../Graphs/ChartJsGraphs/MultilineGraph";

// const handleOnClick = (event, d, i) => {
//   // console.log("handleOnClick", event, d, i);
// };

// const handleMouseOver = (event, d, i) => {
//   // console.log('handleMouseOver', event, d, i);
// };

// const handleMouseOut = (event, d, i) => {
//   // console.log('handleMouseOut', event, d, i);
// };

// const handleMouseEnter = (event, d, i) => {
//   // console.log('handleMouseEnter', event, d, i);
// };

// const handleMouseMove = (event, d, i) => {
//   // console.log('handleMouseMove', event, d, i);
// };

// const handleMouseLeave = (event, d, i) => {
//   // console.log('handleMouseLeave', event, d, i);
// };

// export const events = {
//   handleOnClick,
//   handleMouseOver,
//   handleMouseOut,
//   handleMouseEnter,
//   handleMouseMove,
//   handleMouseLeave,
// };

// export const gridLine = {
//   enableGridXLine: true,
//   enableGridYLine: true,
//   gridLineStrokeWidth: 3,
//   gridLineXStroke: "#fffff",
// };

// export const noGridLine = { enableGridXLine: false, enableGridYLine: true };
// export const noAxes = { hideYAxis: true, hideXAxis: false };
// export const scaleConfig = { gridXYLabelFontSize: "0.5rem" };

// export const L1GridLineConfig = {
//   gridYTicks: 6,
//   hideYAxis: false,
//   gridLineYStroke: "#d9dbdedd",
//   gridLineStrokeWidth: 1,
//   enableGridXLine: false,
//   enableGridYLine: true,
// };

// export const L1GridLineBarConfig = {
//   hideYAxis: true,
//   gridLineXStroke: "#d9dbdedd",
//   gridLineStrokeWidth: 1,
//   enableGridXLine: true,
//   enableGridYLine: false,
// };

// export const coolColumn3DConfig = {
//   graphType: "column",
//   gridXYLabelFontSize: 12,
//   enableTooltip: true,
//   gridYTicks: 6,
//   ...events,
// };

// const graphConfig = {
//   bubble: {
//     enableTooltip: true,
//     graphType: "bubble",
//     ...events,
//   },
//   column: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     enableRectLabels: true,
//     enableTooltip: true,
//     ...events,

//     gridLineStrokeWidth: 1,

//     gridLineYStroke: "#EDEDED",
//     enableGridXLine: false,
//     enableGridYLine: true,
//     xAxisType: "text",
//     singleLineWrp: false,
//     gridXTicks: 20,
//     columnWidth: 32,
//     yTotalLabelFS: 12,
//     triIndicator: true,
//     triIndicatorPosition: 2.5,
//     gridYTicks: 6,
//     hideYAxis: false,
//     yAxisTicksFormat: true,
//     xAxisTicksFormat: true,
//     dasharray: 0,
//     padding: {
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//     },

//     yLabelAlignment: 30,
//     yAxisType: "number",
//   },
//   column_overview: {
//     graphType: "column",
//     gridXYLabelFontSize: 1,
//     enableTooltip: true,
//     ...events,

//     gridLineYStroke: "#F3F3F3",
//     gridLineStrokeWidth: 1,
//     enableGridXLine: false,
//     enableGridYLine: true,
//     xAxisType: "text",
//     singleLineWrp: false,
//     gridXTicks: 8, // no of ticks to show in x axis
//     columnWidth: 15,
//     triIndicator: true,
//     triIndicatorPosition: 2.5,
//     gridYTicks: 6,
//     hideYAxis: false,
//     yAxisTicksFormat: true,
//     xAxisTicksFormat: true,
//     dasharray: 0,
//     enableRectLabels: false,
//     yTotalLabelFS: 3,
//     yLabelAlignment: 30,
//     yAxisType: "number",
//     graphTopPadding: -20,
//   },

//   column_progress: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     enableRectLabels: true,
//     showValues: true,
//     hideYAxis: true,
//     enableTooltip: true,
//     ...events,
//     enableGridXLine: false,
//     enableGridYLine: false,
//     xAxisType: "text",
//     singleLineWrp: true,
//     gridXTicks: 8,
//     columnWidth: 28,
//     yLabelAlignment: 0,
//     yTotalLabelFS: 12,
//   },
//   l0_column: {
//     graphType: "column",
//     ...events,
//     yLabelAlignment: 0,
//     xLabelAlignment: 10,
//     gridLineXStroke: "#d9dbdedd",
//     gridLineStrokeWidth: 1,
//     xAxisType: "text",
//     singleLineWrp: true,
//     hideYAxis: true,
//     hideXAxis: true,
//     columnPadding: 3,
//     triIndicator: true,
//   },
//   column_fixed_width: {
//     graphType: "group",
//     gutterSpace: 1,
//     gridXTicks: 6,
//     gridYTicks: 6,
//     gridLineYStroke: "#EBEBEB",
//     gridLineStrokeWidth: 1,
//     enableGridYLine: true,
//     enableTooltip: true,
//     ...events,
//   },
//   coolColumn3D: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     hideXAxis: false,
//     enableTooltip: true,
//     gridYTicks: 6,
//     yAxisType: "number",
//     // xLabelAlignment: 5,
//     yAxisTicksFormat: true,
//     enableRectLabels: true,
//     colors: ["#675EF2", "#F54A80", "#FCAF41"],
//     ...events,
//   },
//   coolColumn3DNoLabel: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     hideYAxis: true,
//     hideXAxis: false,
//     enableTooltip: true,
//     gridYTicks: 6,
//     yAxisType: "number",
//     // xLabelAlignment: 5,
//     yAxisTicksFormat: true,
//     enableRectLabels: false,
//     colors: ["#675EF2", "#F54A80", "#FCAF41"],
//     yLabelAlignment: 0,
//     ...events,
//   },
//   groupped_column: {
//     graphType: "group",
//     gridYTicks: 6,
//     gridLineYStroke: "#EBEBEB",
//     gridLineStrokeWidth: 1,
//     enableGridYLine: true,
//     enableTooltip: true,
//     yAxisType: "number",
//     yLabelAlignment: 50,
//     yAxisTicksFormat: true,
//     columnWidth: 32,
//     ...events,
//   },
//   gauge: {
//     startAngle: (-1 * Math.PI) / 2,
//     endAngle: Math.PI / 2,
//     enableArcBG: "#F0F2F5",
//     arcDividerStrokeColor: "none",
//     innerRadius: 0.2, // 0.01 - 0.5
//     enableNeedle: true,
//   },
//   gauge_meter: {
//     startAngle: (-1 * Math.PI) / 2,
//     endAngle: Math.PI / 2,
//     enableArcBG: "#F0F2F5",
//     arcDividerStrokeColor: "none",
//     innerRadius: 0.2, // 0.01 - 0.5
//     enableNeedle: true,
//   },
//   gauge2d: {
//     startAngle: Math.PI * -0.5,
//     endAngle: Math.PI * 0.5,
//     endRadius: 0,
//     arcWidth: 20,
//     arcPadding: 5,
//     hideNeedle: false,
//   },
//   line: {
//     // graphType: 'area',
//     graphType: "line",
//     gridXYLabelFontSize: 12,
//     enableCurve: true,
//     enableGradient: true,
//     enableAreaLine: true,
//     areaLineStroke: "#E20074",
//     enableTooltip: true,
//     ...events,
//     yLabelAlignment: 40,
//     yAxisTicksFormat: true,
//     yAxisType: "number",
//     gridYTicks: 6,
//     gridXTicks: 8,
//     graphAreaWMultiplayer: 0.95,
//     xAxisType: "text",
//     singleLineWrp: true,
//     ...gridLine,
//   },
//   stacked_line: {
//     graphType: "area",
//     gridXYLabelFontSize: 16,
//     enableTooltip: true,
//     ...events,
//     yAxisType: "number",
//     yDomainMultiplayer: 0.001,
//     enableGradient: false,
//     gridYTicks: 5,
//     yLabelAlignment: 10,
//     yAxisTicksFormat: true,
//     graphAreaWMultiplayer: 1,
//     gridXTicks: 8,
//     enableGridXLine: true,
//     gridLineStrokeWidth: 1,
//     dasharray: 4,
//     enablePointCircle: true,
//     pointCircleStrokeWidth: 1,
//     // ...gridLine,
//     ...noAxes,
//     ...scaleConfig,
//     hideYAxis: true,
//   },
//   area: {
//     graphType: "area",
//     gridXYLabelFontSize: 16,
//     enableCurve: false,
//     enableGradient: false,
//     enableAreaLine: false,
//     enableTooltip: true,
//     ...events,
//     yAxisType: "number",
//     yLabelAlignment: 20,
//     yAxisTicksFormat: true,
//     enableNeedle: false,
//     gridYTicks: 6,
//     enableGridXLine: true,
//     gridLineStrokeWidth: 1,
//     dasharray: 4,
//     graphAreaWMultiplayer: 0.95,
//     enablePointCircle: false,
//     pointCircleStrokeWidth: 2,
//     ...noAxes,
//     ...scaleConfig,
//     ...gridLine,
//   },
//   result_over_time_area: {
//     graphType: "area",
//     gridXYLabelFontSize: 12,
//     enableCurve: true,
//     enableGradient: true,
//     enableAreaLine: true,
//     areaLineStroke: "#675ef2",
//     enableTooltip: true,
//     yAxisType: "number",
//     yLabelAlignment: 30,
//     yAxisTicksFormat: true,
//     graphAreaWMultiplayer: 0.98,
//     ...events,
//     ...gridLine,
//     enableGridXLine: true,
//   },
//   line2d: {
//     graphType: "line",
//     gridXYLabelFontSize: 12,
//     enableCurve: true,
//     enableGradient: true,
//     enableAreaLine: true,
//     areaLineStroke: "#E20074",
//     enableTooltip: true,
//     graphAreaWMultiplayer: 0.95,
//     ...events,
//     ...gridLine,
//   },
//   donut: {
//     startAngle: -1 * (Math.PI / 2),
//     endAngle: Math.PI + Math.PI / 2,
//     enableArcBG: "#F0F2F5",
//     arcDividerStrokeColor: "none",
//     innerRadius: 0.4, // 0.01 - 0.5
//     arcLabel: false,
//     enablePolyline: false,
//     enableCenterText: true,
//     enableTooltip: true,
//     graphType: "donut",
//     ...events,
//   },
//   concentric_donut: {
//     startAngle: Math.PI * -0.5,
//     endAngle: Math.PI * 0.5,
//     endRadius: 0,
//     arcWidth: 20,
//     arcPadding: 5,
//     hideNeedle: false,
//   },
//   pie: {
//     arcLabel: true,
//     graphType: "pie",
//     enableTooltip: true,
//   },
//   concentric_pie: {
//     startAngle: -1 * Math.PI,
//     endAngle: Math.PI,
//     enableArcBG: "#F0F2F5",
//     arcDividerStrokeColor: "none",
//     innerRadius: 0.2, // 0.01 - 0.5
//     enablePolyline: true,
//     arcLabel: true,
//   },
//   radar: {
//     backgroundType: "circle1",
//     startAngle: -1 * Math.PI,
//     endAngle: Math.PI,
//     enableArcBG: "#F0F2F5",
//     arcDividerStrokeColor: "none",
//     innerRadius: 0.2, // 0.01 - 0.5
//     enablePolyline: true,
//     arcLabel: true,
//   },
//   word_cloud: {},
//   radial_pie: { arcLabel: true },
//   bar: {
//     yAxisType: "text",
//     yLabelAlignment: 60,
//     graphType: "bar",
//     gridXTicks: 8,
//   },
//   bar2d: { graphType: "group" },
//   usmap: {
//     enableTooltip: true,
//     ...events,
//     graphType: "us_map",
//     interpolateColors: ["#675EF2", "#D2CDFF"],
//   },
//   worldmap: { graphType: "world_map" },
//   stackedBar: {
//     graphType: "stack",
//     yLabelAlignment: 45,
//     yAxisType: "text",
//     xAxisType: "number",
//     xAxisTicksFormat: true,
//     gridXTicks: 5,
//     gutterSpace: 25,
//   },
//   butterfly: {},
//   top_theme_config: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     hideYAxis: true,
//     enableTooltip: true,
//     ...events,
//     gridXTicks: 6,
//     yLabelAlignment: 5,
//     singleLineWrp: true,
//     maxData: 5,
//   },
//   top_author_config: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     hideYAxis: true,
//     enableTooltip: true,
//     ...events,
//     enableNeedle: false,
//     yLabelAlignment: 5,
//     yAxisTicksFormat: true,
//     yAxisType: "number",
//   },
//   popular_topics_config: {
//     graphType: "column",
//     gridXYLabelFontSize: 12,
//     hideYAxis: true,
//     enableTooltip: true,
//     ...events,
//     enableNeedle: false,
//     yLabelAlignment: 5,
//     gridXTicks: 4,
//   },
// };

// export const graphTypes = {
//   bubble: {
//     label: "Bubble",
//     component: BigBubble,
//     config: graphConfig.bubble,
//     supportType: ["1d"],
//   },
//   column: {
//     label: "Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.column,
//       enableThreshold: true,
//     },
//     supportType: ["1d", "2d"],
//   },
//   column_overview: {
//     label: "Column",
//     component: DynamicBarGraph,
//     // config: {
//     color: "#4666A2",
//     // },
//     // supportType: ["1d", "2d"],
//   },
//   l0_column: {
//     label: "Column",
//     component: CoolColumn,
//     config: graphConfig.l0_column,
//     supportType: ["1d", "2d"],
//   },
//   result_over_time_column: {
//     label: "Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.column,
//       gutterSpace: 25,
//       hideYAxis: false,
//       yLabelAlignment: 50,
//     },
//     supportType: ["1d", "2d"],
//   },
//   stacked_column: {
//     label: "Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.column,

//       gridLineYStroke: "#EDEDED",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: false,
//       enableGridYLine: true,
//       ...noAxes,
//       ...scaleConfig,
//       triIndicator: true,
//       triIndicatorPosition: 2.5,
//       enableThreshold: true,
//       gridYTicks: 6,
//       hideYAxis: false,
//       yAxisTicksFormat: true,
//       xAxisTicksFormat: true,
//       dasharray: 0,
//       yLabelAlignment: 20,

//       yAxisType: "number",
//     },
//     supportType: ["1d", "2d"],
//   },
//   pr_impact_column: {
//     label: "Column",
//     component: CoolColumn,
//     config: { ...graphConfig.column_fixed_width, gridXTicks: 10 },
//     supportType: ["1d", "2d"],
//   },
//   groupped_column: {
//     label: "Groupped Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.groupped_column,
//       gutterSpace: 50,
//       yLabelAlignment: 40,
//     },
//     supportType: ["2d"],
//   },
//   advanced_author_groupped_column: {
//     label: "Groupped Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.groupped_column,
//       gutterSpace: 20,
//       yLabelAlignment: 40,
//     },
//     supportType: ["2d"],
//   },
//   people_grouped_column: {
//     label: "Groupped Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.groupped_column,
//       yLabelAlignment: 40,
//       yAxisTicksFormat: true,
//       yAxisType: "number",
//       gutterSpace: 70,
//     },
//     supportType: ["2d"],
//   },
//   sentiment_groupped_column: {
//     label: "Groupped Column",
//     component: CoolColumn,
//     config: {
//       ...graphConfig.groupped_column,
//       // gutterSpace: window.innerWidth / 7.5,
//       columnWidth: 64,
//     },
//     supportType: ["2d"],
//   },
//   column_fixed_width: {
//     label: "Fixed Width Column",
//     component: CoolColumn,
//     config: graphConfig.column_fixed_width,
//     supportType: ["1d", "2d"],
//   },
//   column_progress: {
//     label: "Column Progress",
//     component: CoolColumn,
//     config: graphConfig.column_progress,
//     supportType: ["1d", "2d"],
//   },
//   cool_column_3d: {
//     label: "3D Data",
//     component: CoolColumn3D,
//     config: graphConfig.coolColumn3D,
//     supportType: ["3d"],
//   },
//   cool_column_3d_NL: {
//     label: "3D Data",
//     component: CoolColumn3D,
//     config: graphConfig.coolColumn3DNoLabel,
//     supportType: ["3d"],
//   },

//   gauge: {
//     label: "Gauge",
//     component: GreatGuage,
//     config: graphConfig.guage,
//     supportType: ["1d"],
//   },
//   gauge_meter: {
//     label: "Gauge Meter",
//     component: PieGraph,
//     config: graphConfig.gauge_meter,
//     supportType: ["1d"],
//   },
//   line: {
//     label: "Line",
//     component: LinearLine,
//     config: graphConfig.line,
//     supportType: ["1d", "2d"],
//   },
//   stacked_line: {
//     label: "Stacked Line",
//     component: LinearLine,
//     config: graphConfig.stacked_line,
//     supportType: ["1d", "2d"],
//   },
//   pie: {
//     label: "Pie",
//     component: PieGraph,
//     config: graphConfig.pie,
//     supportType: ["1d"],
//   },
//   donut: {
//     label: "Donut",
//     component: PieGraph,
//     config: graphConfig.donut,
//     supportType: ["1d"],
//   },
//   concentric_donut: {
//     label: "Concentric Donut",
//     component: GreatGuage,
//     config: graphConfig.concentric_donut,
//     supportType: ["2d"],
//   },
//   radar: {
//     label: "Radar",
//     component: Radar,
//     config: graphConfig.radar,
//     supportType: ["1d"],
//   },
//   word_cloud: {
//     label: "Word Cloud",
//     component: WordCloud,
//     config: graphConfig.wordcloud,
//     supportType: ["1d"],
//   },
//   radial_pie: {
//     label: "Radial Pie",
//     component: RadialPieChart,
//     config: graphConfig.radial_pie,
//     supportType: ["1d"],
//   },
//   //   butterfly: {
//   //     label: "Butterfly",
//   //     component: HorizontalMultiBar,
//   //     config: graphConfig.butterfly,
//   //     supportType: ["2d"],
//   //   },
//   //   sentiment_by_theme_butterfly: {
//   //     label: "Butterfly",
//   //     component: HorizontalMultiBar,
//   //     config: { ...graphConfig.butterfly, barGap: "0" },
//   //     supportType: ["2d"],
//   //   },
//   concentric_pie: {
//     label: "Concenteric Pie",
//     component: PieGraph,
//     config: graphConfig.concentric_pie,
//     supportType: ["1d"],
//   },
//   bar: {
//     label: "Bar",
//     component: BestBar,
//     config: {
//       ...graphConfig.bar,
//       yLabelAlignment: 80,
//       yAxisTicksFormat: true,
//       yAxisType: "number",
//       gridLineXStroke: "#d9dbde",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: true,
//       enableGridYLine: false,
//     },
//     supportType: ["1d", "2d"],
//   },
//   author_impact_bar: {
//     label: "Bar",
//     component: BestBar,
//     config: {
//       ...graphConfig.bar,
//       yLabelAlignment: 55,
//       yAxisTicksFormat: true,
//       yAxisType: "number",
//       hideXAxis: true,
//       gutterSpace: 35,

//       gridLineXStroke: "#d9dbde",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: true,
//       enableGridYLine: false,
//     },
//     supportType: ["1d", "2d"],
//   },
//   top_sources_bar: {
//     label: "Bar",
//     component: BestBar,
//     config: {
//       ...graphConfig.bar,
//       yLabelAlignment: 70,
//       yAxisTicksFormat: true,
//       yAxisType: "text",
//       xAxisType: "number",
//       xAxisTicksFormat: true,
//       wrapLength: 7,
//       gridLineXStroke: "#d9dbde",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: true,
//       enableGridYLine: false,
//     },
//     supportType: ["1d", "2d"],
//   },
//   top_author_bar: {
//     label: "Bar",
//     component: BestBar,
//     config: {
//       ...graphConfig.bar,
//       yLabelAlignment: 70,
//       yAxisTicksFormat: true,
//       yAxisType: "text",
//       xAxisType: "number",
//       xAxisTicksFormat: true,
//       wrapLength: 7,
//       gridLineXStroke: "#d9dbde",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: true,
//       enableGridYLine: false,
//     },
//     supportType: ["1d", "2d"],
//   },
//   us_map: {
//     label: "US Map",
//     component: USMapChart,
//     config: graphConfig.usmap,
//     supportType: ["1d"],
//   },
//   world_map: {
//     label: "World Map",
//     component: WorldMapGraph,
//     config: graphConfig.worldmap,
//     supportType: ["1d"],
//   },
//   grouped_bar: {
//     component: BestBar,
//     config: graphConfig.bar2d,
//     supportType: ["2d"],
//   },
//   stacked_bar: {
//     component: BestBar,
//     maxData: 6,
//     config: {
//       ...graphConfig.stackedBar,
//       yLabelAlignment: 50,
//       gutterSpace: 40,
//       wrapLength: 4,
//       gridLineXStroke: "#d9dbdedd",
//       gridLineStrokeWidth: 1,
//       enableGridXLine: true,
//       enableGridYLine: false,
//     },
//     supportType: ["2d"],
//   },
//   //   uber_stats: {
//   //     component: UberStats,
//   //     config: graphConfig.stackedBar,
//   //     supportType: ["2d"],
//   //   },
//   //   uber_stats_volume: {
//   //     component: UberStatsVolume,
//   //     config: graphConfig.stackedBar,
//   //     supportType: ["2d"],
//   //   },
//   //   uber_stats_sentiment: {
//   //     component: UberStatsSentiment,
//   //     config: graphConfig.stackedBar,
//   //     supportType: ["2d"],
//   //   },
//   // profile_line , profile_radar
//   profile_line: {
//     label: "Line",
//     component: LinearLine,
//     config: graphConfig.area,
//     supportType: ["1d", "2d"],
//   },
//   profile_radar: {
//     label: "Radar",
//     component: Radar,
//     config: graphConfig.radar,
//     supportType: ["1d"],
//   },
//   area: {
//     label: "Area",
//     component: LinearLine,
//     config: graphConfig.area,
//     supportType: ["1d", "2d"],
//   },
//   //chartjs component
//   dynamicArea: {
//     label: "Dynamic Area",
//     component: DynamicArea,
//   },
//   linechartjs: {
//     label: "Line Chart",
//     component: Linegraph,
//   },
//   dynamicLine: {
//     label: "Dynamic Line",
//     component: DynamicLine,
//   },
//   dynamicStackedBar: {
//     label: "Dynamic Stacked Bar",
//     component: StackedBar,
//   },
//   stacked_area: {
//     label: "Stacked Area",
//     component: StackedAreaChart,
//   },
//   stacked_bar_chart: {
//     label: "StackedBarChart",
//     component: StackedBarChart,
//   },
//   grouped_stacked_bar_chart: {
//     label: "GroupedStackedBarChart",
//     component: GroupedStackedBarChart,
//   },
//   dynamicBarGraph: {
//     label: "Dynamic Bar Graph",
//     component: DynamicBarGraph,
//   },
//   multilineGraph: {
//     label: "Multi Line Graph",
//     component: MultilineGraph,
//   },
// };
