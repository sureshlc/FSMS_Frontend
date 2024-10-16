import React from "react";
import PropTypes from "prop-types";
import {
  DataContainer,
  SmallBoxContainer,
  TrendContainer,
  GraphDataContainer,
  Datafieldcontainer,
  TitleContainer,
  PrimaryTitleContainer,
  SecondaryTitleContainer,
  TooltipWrapper,
  IndicatorWrapper,
  Circle,
  Label,
  TitleWrapper,
} from "./index.sc";
import InfoIcon from "../../../../assets/icons/components/InfoIcon";
import Tooltip from "../../../ToolTip";

const colorsObj = {
  Red: "#FF787C",
  Green: "#68C4AF",
  Yellow: "#FEDF85",
};

const TooltipContent = ({ tooltipData }) => (
  <TooltipWrapper>
    Thresholds
    {tooltipData.map((item) => (
      <IndicatorWrapper>
        <Circle color={item.color} />
        <Label>{item.label}</Label>
      </IndicatorWrapper>
    ))}
  </TooltipWrapper>
);

const BoxDataitem = ({ data }) => {
  if (!data || data.length === 0) {
    return <DataContainer />;
  } else {
    let {
      title,
      subtitle,
      alert,
      content,
      trends,
      graph,
      is3YearAverage,
      latestYear,
      threshold,
    } = data[0];

    const thresholds = threshold;

    console.log(trends, "trend");
    const tooltipData = [
      {
        color: title === "Sanitation" ? colorsObj.Red : colorsObj.Green,
        label: `< ${thresholds[0]}`,
      },
      {
        color: colorsObj.Yellow,
        label: `${thresholds[0]} - ${thresholds[1]}`,
      },
      {
        color: title === "Sanitation" ? colorsObj.Green : colorsObj.Red,
        label: `> ${thresholds[1]} `,
      },
    ];

    return (
      <DataContainer>
        <TitleContainer>
          {/* <span
            style={{
              width: "100%",
              textAlign: "end",
            }}
          >
            {content}
          </span> */}
          <PrimaryTitleContainer>
            <TitleWrapper>
              <span>{title}</span>
              <span>{graph?.props?.unit}</span>
            </TitleWrapper>
            {title === "Caloric losses" ? (
              ""
            ) : (
              <Tooltip
                content={<TooltipContent tooltipData={tooltipData} />}
                variant="light"
              >
                <InfoIcon />
              </Tooltip>
            )}
          </PrimaryTitleContainer>
          <SecondaryTitleContainer>{subtitle}</SecondaryTitleContainer>
        </TitleContainer>
        <Datafieldcontainer>
          {graph && <GraphDataContainer>{graph}</GraphDataContainer>}
          <TrendContainer
            className={title === "Caloric losses" ? "widthwrap" : ""}
          >
            {trends}
          </TrendContainer>
        </Datafieldcontainer>
      </DataContainer>
    );
  }
};

BoxDataitem.propTypes = {
  title: PropTypes.string,
  trends: PropTypes.object,
  graph: PropTypes.object,
};

export default BoxDataitem;
