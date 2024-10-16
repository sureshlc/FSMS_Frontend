import React, { useEffect, useState } from "react";
import {
  BoxBody,
  BoxSubTitle,
  BoxTitle,
  BoxTitleContainer,
  BoxWrapper,
  GraphCon,
} from "./index.sc";
import Carousel from "../carousel";
import { PieGraph } from "../../Graphs";
import { actualOneD } from "../../Graphs/utils/mockData";
import { graphTypes } from "../../constants/widgets";
import Legend from "../legends";

const pieConfig = {
  startAngle: -1 * (Math.PI / 2),
  endAngle: Math.PI + Math.PI / 2,
  enableArcBG: "#F0F2F5",
  arcDividerStrokeColor: "none",
  innerRadius: 0.4, // 0.01 - 0.5
  //   arcLabel: true,
  enablePolyline: false,
  enableCenterText: true,
  enableTooltip: true,
  graphType: "donut",
};

const legendData = [
  {
    label: "Adult Female",
    color: "#F9A6D1",
  },
  {
    label: "Female Child",
    color: "#F667B0",
  },
  {
    label: "Male Child",
    color: "#009EDB",
  },
  {
    label: "Adult Male",
    color: "#006E99",
  },
];

const getGraphComponent = (data = []) => {
  return (
    <GraphCon>
      {data.map((ele) => {
        const GraphComponent = graphTypes[ele.component].component;
        const config = graphTypes[ele.component].config;
        return <GraphComponent config={config} data={ele.data} />;
      })}
    </GraphCon>
  );
};

const BoxCarousel = ({ title = "", slides = [] }) => {
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    const finalData = slides.map((slide, i) => {
      return {
        key: i,
        label: slide.label,
        component: getGraphComponent(slide.data),
      };
    });
    setSlideData(finalData);
  }, [slides]);
  return (
    <BoxWrapper>
      <BoxTitleContainer>
        <BoxTitle>{title}</BoxTitle>
        <BoxSubTitle>
          {/* <Legend legendData={legendData} /> */}
        </BoxSubTitle>
      </BoxTitleContainer>
      <BoxBody>
        <Carousel slides={slideData} />
      </BoxBody>
    </BoxWrapper>
  );
};

export default BoxCarousel;
