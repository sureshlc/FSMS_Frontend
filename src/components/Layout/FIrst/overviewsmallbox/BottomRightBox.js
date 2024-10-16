import React, { useEffect, useState } from "react";
import {
  BoxBody,
  BoxTitleContainer,
  BoxWrapper,
  FlexColDiv,
  GraphCon,
} from "../../../box-carousel/index.sc";
import styled from "styled-components";
import Carousel from "../../../carousel";
import PortalTooltip from "../../../../Graphs/tooltip";
import GraphTooltip from "../../../GraphTooltip";
import { graphTypes } from "../../../../constants/widgets";
// import { formatNumberWithCommas } from "../../../../Viewer/NewGraphs/assets/assets";
import InfoIcon from "../../../../assets/icons/components/InfoIcon";
import Tooltip from "../../../ToolTip";
import {
  Circle,
  IndicatorWrapper,
  Label,
  TooltipWrapper,
  TrendsViewer,
} from "./index.sc";
import Trend from "../../../trend";

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

const BottomRightBox = ({ data: slides }) => {
  const [slideData, setSlideData] = useState([]);
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState({});

  const handleMouseEnterFn = (is2dData, unit, items) => (event, d) => {
    setEnableTooltip(true);
    setToolTipPos({
      left: event.clientX,
      top: event.clientY + 10,
    });

    if (is2dData) {
      let toolTipDataFromGraph = {
        label: d.label,
        value: Number.isInteger(d?.rawData?.value)
          ? d?.rawData?.value
          : d?.rawData?.value.toFixed(2),
        unit: unit,
        items: items.map((item, i) => {
          return {
            label: item,
            value: d[`label${i}`],
            color: d[`label${i}Color`],
          };
        }),
      };

      setTooltipData(toolTipDataFromGraph);
    } else {
      let toolTipDataFromGraph = {
        label: d.label,
        value: Number.isInteger(d?.rawData?.value)
          ? d?.rawData?.value
          : d?.rawData?.value.toFixed(2),
        unit: unit,
      };
      setTooltipData(toolTipDataFromGraph);
    }
  };

  const handleMouseMove = (event, d) => {
    setEnableTooltip(true);
    setToolTipPos({
      left: event.clientX,
      top: event.clientY + 10,
    });
  };

  const handleMouseLeave = () => {
    setEnableTooltip(false);
  };

  const getToolTip = (is2dData, unit, items) => {
    const handleMouseEnter = handleMouseEnterFn(is2dData, unit, items);
    return {
      handleMouseEnter,
      handleMouseMove,
      handleMouseLeave,
    };
  };

  useEffect(() => {
    if (slides) {
      const filteredSlides = slides.filter((ele) => {
        const graphDataArr = ele?.data[0]?.data?.data;
        return graphDataArr?.length > 0;
      });

      const finalData = filteredSlides.map((slide, i) => {
        const tootTipEvents = getToolTip(
          slide.is2dData,
          slide.unit,
          slide.items
        );
        return {
          key: i,
          label: slide.label,
          component: getGraphComponent(slide, slide.data, tootTipEvents),
        };
      });
      setSlideData(finalData);
    }
  }, [slides]);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseLeave);
    return () => {
      document.removeEventListener("mousedown", handleMouseLeave);
    };
  }, []);

  return (
    <BoxWrapper>
      {enableTooltip && (
        <PortalTooltip
          isOpen={true}
          pos={toolTipPos}
          align={toolTipPos.left > window.innerWidth / 2 ? "left" : "right"}
          vAlign={toolTipPos.top > window.innerHeight / 2 ? "top" : "bottom"}
        >
          <GraphTooltip tooltipData={tooltipData} />
        </PortalTooltip>
      )}
      <Carousel slides={slideData} autoPlay={false} dotBgColor="#8089B4" />
    </BoxWrapper>
  );
};

const getGraphComponent = (slide, data = [], defaultConfig) => {
  const arrowIndicatorPosition = slide?.data[0].data.data.findIndex(
    (item) => item.label === slide.latestYear
  );
  const tooltipData = [
    {
      color: slide.label === "Women" ? colorsObj.Green : colorsObj.Red,
      label: `< ${slide?.threshold[0]}`,
    },
    {
      color: colorsObj.Yellow,
      label: `${slide?.threshold[0]} - ${slide?.threshold[1]}`,
    },
    {
      color: slide.label === "Women" ? colorsObj.Red : colorsObj.Green,
      label: `> ${slide?.threshold[1]} `,
    },
  ];
  console.log(slide, "sli");
  return (
    <FlexColDiv key={slide.label}>
      <BoxTitleContainer>
        <Title>
          <TitleWrapper>
            <PrimaryTitle>
              {slide.label} <span>{slide.unit}</span>{" "}
              {slide.label == "Women" && (
                <Tooltip
                  content={<TooltipContent tooltipData={tooltipData} />}
                  variant="light"
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </PrimaryTitle>
            <SecondaryTitle>{slide?.subLabel}</SecondaryTitle>
          </TitleWrapper>
          {/* <TrendsViewer>
            {slide.label !== "Prevalence of Undernourishment" &&
              slide.label !== "Per Capita Food Supply variability" &&
              slide.label !== "Per capita food production variability" && (
                <Trend
                  data={{
                    year: slide.latestYear,
                    value: slide.latestYearChange,
                    isGreen: slide.isGreen,
                    label: slide.label,
                  }}
                />
              )}
          </TrendsViewer> */}
        </Title>
        <Sublabel>
          {slide?.is3YearAverage && <SublabelItem>3 Year Average</SublabelItem>}
          {slide.is2dData && (
            <LegendBody>
              {slide.items.map((ele, i) => (
                <LegendItems>
                  <LegendColor
                    color={
                      ele === "Adult Male"
                        ? "#82B6FE"
                        : ele === "Adult Female"
                          ? "#F9A8E7"
                          : data[0]?.data?.labels[i]?.color
                    }
                  />
                  <LegendItemValue>{ele}</LegendItemValue>
                </LegendItems>
              ))}
            </LegendBody>
          )}
        </Sublabel>
      </BoxTitleContainer>
      <BoxBody className={slide?.label === "Caloric losses" ? "h-reduce" : ""}>
        {data.map((ele) => {
          const GraphComponent = graphTypes[ele.component].component;
          const config = {
            ...graphTypes[ele.component].config,
            ...defaultConfig,
            selected: arrowIndicatorPosition,
            ...(slide.threshold &&
              slide.threshold.length > 0 &&
              slide.label !== "Women" && {
              summary: {
                thresholdArr: [
                  {
                    label: "Threshold",
                    value: slide.threshold[0],
                  },
                ],
              },
            }),
          };

          return (
            <GraphComponent
              key={ele.component}
              config={config}
              data={ele.data}
            />
          );
        })}
      </BoxBody>
    </FlexColDiv>
  );
};

export default BottomRightBox;

const LegendBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  /* margin-left: 1rem; */
`;

const LegendItems = styled.div`
  display: #7b8092;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LegendItemValue = styled.div``;

const LegendColor = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${(props) => props.color};
`;

const SublabelItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 1rem;
  gap: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: normal;
  align-content: stretch;
  gap: 0.2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrimaryTitle = styled.div`
  color: #141630;
  font-size: 1.0625rem;
  display: flex;
  gap: 0.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 94.118% */
  letter-spacing: -0.02125rem;
  > span {
    color: #7b8092;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: -0.02125rem;
  }
`;

const SecondaryTitle = styled.div`
  color: #73777f;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Sublabel = styled.div`
  color: #626262;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem; /* 107.692% */
`;
