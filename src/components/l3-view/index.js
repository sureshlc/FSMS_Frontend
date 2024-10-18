import React, { useState } from "react";
import {
  GraphView,
  L3Body,
  L3HeaderWrp,
  L3ViewWrapper,
  TableView,
} from "./index.sc";
import L3Header from "./l3-header";
import { graphTypes, scaleConfig } from "../../constants/widgets";
import { l3Data } from "../../mock-data/graphData";
import CustomTable from "../table";

const selectedCountries = [{ label: "Iraq", value: "Iraq" }];

const getGraphComponent = (data, activeGraph) => {
  // console.log(data, activeGraph, "-->getgrah");
  const compName =
    graphTypes[data?.allowedGraphTypes[activeGraph]] ||
    graphTypes[data?.component];
  const GraphComponent = compName?.component;
  const config = {
    ...compName?.config,
    // ...noAxes,
    ...scaleConfig,
    hideYAxis: false,
    hideXAxis: false,
    yLabelAlignment: 30,
  };
  return <GraphComponent config={config} data={data.data} />;
};

const L3View = ({ handleCloseL3 = () => {}, widgetName }) => {
  const [countries, setCountries] = useState(selectedCountries);
  const [activeGraph, setActiveGraph] = useState(0);

  const data = {
    allowedGraphTypes: ["groupped_column", "stacked_line"],
    data: l3Data,
  };

  const handleSelectGraph = (graphIdx) => {
    setActiveGraph(graphIdx);
  };

  const handleSelectFilter = (name, selectedOptions) => {
    // console.log(name, selectedOptions, "filter");
    const newCountries = [...countries, selectedOptions];
    setCountries(newCountries);
  };

  const handleUpdateCountries = (data) => {
    setCountries(data);
  };

  return (
    <L3ViewWrapper>
      <L3HeaderWrp>
        <L3Header
          selectedCountries={countries}
          activeGraph={activeGraph}
          handleSelectGraph={handleSelectGraph}
          handleCloseL3={handleCloseL3}
          handleSelectFilter={handleSelectFilter}
          handleUpdateCountries={handleUpdateCountries}
          widgetName={widgetName}
        />
      </L3HeaderWrp>
      <L3Body>
        <GraphView>{getGraphComponent(data, activeGraph)}</GraphView>
        <TableView>{/* <CustomTable /> */}</TableView>
      </L3Body>
    </L3ViewWrapper>
  );
};

export default L3View;
