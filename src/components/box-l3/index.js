import React, { useEffect, useState } from "react";
import {
  BoxBody,
  BoxTitleContainer,
  BoxWrapper,
  FlexColDiv,
  InfoSection,
  InfoSectionWrapper,
  LegendBody,
  LegendColor,
  LegendItemValue,
  LegendItems,
  PrimaryTitle,
  TrendsViewer,
  Sublabel,
  SublabelItem,
  Title,
  InfoTitle,
  Numbers,
} from "./index.sc";
import PortalTooltip from "../../Graphs/tooltip";
import GraphTooltip from "../GraphTooltip";
import Carousel from "../carousel";
import { graphTypes } from "../../constants/widgets";
import { formatNumber } from "../../utils";
import Trend from "../trend";

const BoxL3 = ({ data: slides, isOpen = false }) => {
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
        value: d?.rawData?.value?.toFixed(2),
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
        value: d?.rawData?.value?.toFixed(2),
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
          component: getGraphComponent(
            slide,
            slide.data,
            tootTipEvents,
            isOpen
          ),
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
      {/* {enableTooltip && (
        <PortalTooltip
          isOpen={true}
          pos={toolTipPos}
          align={toolTipPos.left > window.innerWidth / 2 ? "left" : "right"}
          vAlign={toolTipPos.top > window.innerHeight / 2 ? "top" : "bottom"}
        >
          <GraphTooltip tooltipData={tooltipData} />
        </PortalTooltip>
      )} */}
      <Carousel
        slides={slideData}
        autoPlay={false}
        dotBgColor="#8089B4"
        dotBorder="#8089B4"
        isOpen={isOpen}
      />
    </BoxWrapper>
  );
};

const getGraphComponent = (slide, data = [], defaultConfig, isOpen) => {
  const latestYearValues = data[0]?.data?.data?.find(
    (ele) => ele.label === slide.latestYear
  );

  console.log("slide", slide);

  const latestYearData = slide.items.map((ele, i) => {
    try {
      return {
        label: ele,
        value:
          formatNumber(latestYearValues[`value${i}`], 2)?.slice(0, -1) || 0,
        color: data[0]?.data?.labels[i]?.color,
        units: formatNumber(latestYearValues[`value${i}`], 2)?.slice(-1) || "",
      };
    } catch (error) {
      console.log("issue-here", ele, i);
      return {
        label: ele,
        value: 0,
        color: data[0]?.data?.labels[i]?.color,
        units: "",
      };
    }
  });
  return (
    <FlexColDiv key={slide.label}>
      <BoxTitleContainer>
        <Title>
          <PrimaryTitle>
            {slide.label}
            <span>{slide.unit}</span>{" "}
          </PrimaryTitle>
          {/* <TrendsViewer>
            {
              <Trend
                data={{
                  year: slide.latestYear,
                  value: slide.latestYearChange,
                  isGreen: slide.isGreen,
                  label: slide.label,
                }}
              />
            }
          </TrendsViewer> */}
        </Title>
        <Sublabel>
          <SublabelItem>
            {slide.is3YearAverage ? "3 Year Average" : ""}
          </SublabelItem>
        </Sublabel>
        {!isOpen && (
          <InfoSectionWrapper>
            {latestYearData.map((ele, i) => (
              <InfoSection key={i}>
                <InfoTitle color={ele.color}>
                  <span></span>
                  {ele.label}
                </InfoTitle>
                <Numbers>
                  {ele.value}
                  <span>{ele.units}</span>
                </Numbers>
              </InfoSection>
            ))}
          </InfoSectionWrapper>
        )}
        {isOpen && (
          <LegendBody>
            {slide.items.map((ele, i) => (
              <LegendItems>
                <LegendColor color={data[0]?.data?.labels[i]?.color} />
                <LegendItemValue>{ele}</LegendItemValue>
              </LegendItems>
            ))}
          </LegendBody>
        )}
      </BoxTitleContainer>
      {isOpen && (
        <BoxBody>
          {data.map((ele) => {
            const GraphComponent = graphTypes[ele.component].component;
            const config = {
              ...graphTypes[ele.component].config,
              ...defaultConfig,
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
      )}
    </FlexColDiv>
  );
};

export default BoxL3;
