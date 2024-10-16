import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BoxDataContainer,
  Chart,
  Icon,
  Icons,
  PrimaryTitle,
  SecondaryTitle,
  SmallBoxContainer,
  Title,
  TopContainer,
} from "./index.sc";
import Area from "../../../../../assets/icons/components/Area";
import Column from "../../../../../assets/icons/components/Column";
// import Legend from "../../../../legends";
import {
  graphTypes,
  noAxes,
  scaleConfig,
} from "../../../../../constants/widgets";
import Carousel from "../../../../carousel";
import BottomRightBox from "../../overviewsmallbox/BottomRightBox";

const PrimaryBoxes = ({ numberOfBoxes, data, slides }) => {
  console.log(data);
  const boxesData = Array.from(
    { length: numberOfBoxes },
    (_, index) => data?.[index] || {}
  );

  return (
    <BoxDataContainer>
      {boxesData.map((boxesData, index) => (
        <BottomRightBox
          // title={{
          //   primary: slides[index].label,
          //   secondary: "in total population",
          // }}
          data={slides}
        />
        // <Carousel  />
      ))}
    </BoxDataContainer>
  );
};

PrimaryBoxes.propTypes = {
  numberOfBoxes: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

const getGraphComponent = (data, activeGraph) => {
  // console.log(data, activeGraph, "-->getgrah");
  const compName =
    graphTypes[data?.allowedGraphTypes[activeGraph]] ||
    graphTypes[data?.component];
  const GraphComponent = compName?.component;
  const config = {
    ...compName?.config,
    ...noAxes,
    ...scaleConfig,
    yLabelAlignment: 10,
  };
  return <GraphComponent config={config} data={data.data} />;
};

const PrimaryBoxItems = ({ data }) => {
  // console.log(data, "data");
  const [activeGraph, setActiveGraph] = useState(0);

  const handleSelectGraph = (graph) => {
    setActiveGraph(graph);
    getGraphComponent(data, graph);
  };
  return (
    <SmallBoxContainer>
      <TopContainer>
        <Title>
          <PrimaryTitle>{data?.primary_title}</PrimaryTitle>
          <SecondaryTitle>{data?.secondary_title}</SecondaryTitle>
        </Title>
        <Icons>
          {/* {data?.icons.map((icon, index) => (
            <div key={index}>{icon}</div>
          ))} */}
          <Icon
            className={activeGraph === 0 ? "active" : ""}
            onClick={() => handleSelectGraph(0)}
          >
            <Area color={activeGraph === 0 ? "#fff" : "#7B8092"} />
          </Icon>
          <Icon
            className={activeGraph === 1 ? "active" : ""}
            onClick={() => handleSelectGraph(1)}
          >
            <Column color={activeGraph === 1 ? "#fff" : "#7B8092"} />
          </Icon>
        </Icons>
      </TopContainer>
      <Chart>{getGraphComponent(data, activeGraph)}</Chart>
      {/* <Legend legendData={} /> */}
    </SmallBoxContainer>
  );
};

export default PrimaryBoxes;
