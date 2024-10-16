import React, { useEffect, useRef, useState } from "react";
import { graphTypes } from "../../constants/widgets";
import {
  SlotBody,
  SlotDetailsWrp,
  TooltipLabel,
  TooltipLabelContainer,
  TooltipUnit,
  TooltipValue1,
  TooltipValue2,
  TooltipValue2Container,
  TooltipValueContainer,
  TooltipWrapper,
} from "./index.sc";
import PortalTooltip from "../../Graphs/tooltip";
import { formatNumber } from "../../utils";
import NoDataComp from "../NoDataComp";
import { useNavigate } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import linedata from '../../assets/Placeholder/lineimg.png';
import Bardata from '../../assets/Placeholder/Group 351215.png';

const legendData = [
  { label: "Good", color: "#68C4AF" },
  { label: "Poor", color: "#FEDF85" },
  { label: "Bad", color: "#FF787C" },
];

const accTitleEndPointMapping = {
  production_trade: "Production-Trade",
  consumption: "consumption",
  food_price: "food-price",
};

const stackedBarLegendData = [
  { label: "A", color: "#009EDB" },
  { label: "B", color: "#5CD0FD" },
  { label: "C", color: "#B1E9FF" },
];

const columnOverViewLegend = [
  {
    label: "Increase",
    color: "#68C4AF",
  },
  {
    label: "Decrease",
    color: "#FF787C",
  },
];

const getGraphComponent = (
  widget,
  defaultConfig,
  arrowIndicator,
  countryCode,
  fixedTooltip,
  component
) => {
  const compName = graphTypes[widget?.component];
  console.log(compName, 'comp');
  const createDynamicGraph = () => {
    if (compName.label === "Multi Line Graph") {
      return linedata;
    } else if (compName.label === "Dynamic Bar Graph" || compName.label === "Column") {
      return Bardata;
    } else {
      throw new Error("Unsupported graph type");
    }
  }
  const GraphComponent = compName?.component;

  const config = {
    ...compName?.config,
  };

  // handling case of no data
  return widget?.data?.length > 0 ? (
    <GraphComponent
      config={config}
      data={widget}
      selectedCountryName={countryCode}
      color={compName?.color}
      fixedTooltip={fixedTooltip}
    />
  ) : (
    <NoDataComp graphType={createDynamicGraph()} />
  );
};

const SlotDetails = ({
  accTitle,
  widget,
  component,
  selectedTabLabel = "",
  primary = "",
  secondary = "",
  legend = true,
  unit = "",
  arrowIndicator = false,
  headerContent,
  isHeaderAvailable,
  isSubLabel,
  countryCode = "",
  fixedTooltip = false,
}) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [tooltipEvent, setTooltipEvent] = useState({});
  const graphRef = useRef(null);
  const navigate = useNavigate();
  const [renderGraph, setRenderGraph] = useState(false);
  useEffect(() => {
    setRenderGraph(false);
    const timeoutId = setTimeout(() => {
      setRenderGraph(true);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const tooltipEnabled = true;
  console.log(component, 'componet');
  const handleMouseEnter = (event, d, i) => {
    if (tooltipEnabled) {
      setEnableTooltip(true);
      setTooltipEvent({
        event,
        d,
        i,
      });
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
      const tData = d.data || d;
      setTooltipData({ data: tData, rawData: d?.rawData });
    }
  };

  const handleMouseMove = (event, d, i) => {
    if (tooltipEnabled) {
      setTooltipEvent({
        event,
        d,
        i,
      });
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
    }
  };
  const handleMouseLeave = (event, d, i) => {
    if (tooltipEnabled) {
      setTooltipEvent({});
      setToolTipPos({
        left: 0,
        top: 0,
      });
      setEnableTooltip(false);
      setTooltipData();
    }
  };

  const defaultConfig = {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    selectedTabLabel,
    // handleOnClick,
  };

  const getLegend = (graphType) => {
    switch (graphType) {
      case "column_overview":
        return columnOverViewLegend;
      case "dynamicStackedBar":
        return stackedBarLegendData;
      case "dynamicLine":
        return "";
      default:
        return legendData;
    }
  };

  // let legendData = [];
  // console.log(widget, "widget->data");
  // const twoD = widget?.data?.labels?.length > 1;

  // if (widget?.data?.legends?.length > 0) {
  //   legendData = [...widget.data.legends];
  // } else {
  //   if (twoD) {
  //     legendData = widget?.data?.labels.map((ele) => ({
  //       label: ele?.label,
  //       value: ele?.label?.replaceAll(" ", "").toLowerCase(),
  //       color: ele?.color,
  //     }));
  //   } else {
  //     legendData = widget?.data?.legends?.map((ele) => ({
  //       label: ele?.label,
  //       value: ele?.value,
  //       color: ele?.color,
  //     }));
  //   }
  // }

  const endPoint = sidebarMockData.find((ele) => ele.value === accTitle);

  const handleGraphClick = () => {
    navigate(
      `/${endPoint.endpoint}?countryFilter=${selectedTabLabel.props.item.title}&countryId=${countryCode}`
    );
  };

  return (
    <SlotDetailsWrp ref={graphRef}>
      {headerContent && headerContent}

      <SlotBody
        onClick={handleGraphClick}
        className="slot-body"
        header={!!isHeaderAvailable}
        sublabel={isSubLabel}
      >
        {renderGraph
          ? getGraphComponent(
            { component, ...widget },
            defaultConfig,
            arrowIndicator,
            countryCode,
            fixedTooltip,
            component
          )
          : ""}
        {tooltipEnabled && enableTooltip && (
          <PortalTooltip
            isOpen={true}
            pos={toolTipPos}
            align={toolTipPos.left > window.innerWidth / 2 ? "left" : "right"}
            vAlign={"top"}
          >
            <TooltipWrapper>
              <TooltipLabelContainer>
                <TooltipLabel>{tooltipData?.rawData?.label}</TooltipLabel>
              </TooltipLabelContainer>
              <TooltipValueContainer>
                <TooltipValue1>{selectedTabLabel}</TooltipValue1>
                <TooltipValue2Container>
                  <TooltipValue2>
                    {formatNumber(
                      tooltipData?.data?.rawData?.value ||
                      tooltipData?.data?.value ||
                      0
                    )}
                  </TooltipValue2>
                  <TooltipUnit>
                    {widget?.unit ||
                      (unit?.toLowerCase() === "percent" ? "%" : unit)}
                  </TooltipUnit>
                </TooltipValue2Container>
              </TooltipValueContainer>
            </TooltipWrapper>
          </PortalTooltip>
        )}
      </SlotBody>
      {/* {legend && (
        <SlotFooter className="slot-footer">
          <Legend legendData={getLegend(component)} />
        </SlotFooter>
      )} */}
    </SlotDetailsWrp>
  );
};

export default SlotDetails;
