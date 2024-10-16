import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //expanded of the viewer
  const [expanded, setExpanded] = useState(false);
  //sidebar
  //const [sideBarList, setSideBarList] = useState([]); // in this we are storeing whole data  of the sidebar
  const [sideBarClickedData, setSideBarClickedData] = useState(""); // here we are storing the clicked data on the sidebar

  // similar_interests
  const [similar_interests, setSimilar_interests] = useState([]);
  // graphType
  const [graphType, setGraphType] = useState([]);
  // in which viewer we are viewing from similar intrest
  //   const [viewer, setViewer] = useState("Production");
  const [viewer, setViewer] = useState("Yield"); // so from here we know the where we are
  const [showhichGrpah, setShowWhichGraph] = useState("primary_graph"); //

  // related data
  const [relatedData, setRelatedData] = useState([]);

  // dropdown datas
  const [dropdownFilterData, setDropdownFilterData] = useState();
  const [dropDownSelectedData, setdropDownSelectedData] = useState({
    "Region/Country": "All Mashreq Countries",
    Commodity: "Rice",
  });



  // state for the
  const [simileIntrestData, setSimilarIntrest] = useState({});

  // year selection
  const [currentYear, setCurrentYear] = useState(2020);

  // graphData
  const [graphData, setGraphData] = useState(null);
  //actualGraphData
  const [actualGraphData, setActualGraphData] = useState();

  // adding loaders
  const [gloablLoading, setGloablLoading] = useState(false);
  const [viewerloading, setViewerLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [headerLoading, setHeaderLoading] = useState(false);

  // seconday country name  from graph to the home.jsx
  const [secondaryGraphCountryName, setSecondaryGraphCountryName] =
    useState("");

  // units are always coming from backend straight so easily we can show inside the tooltip
  const [gloablUnit, setGlobalUnit] = useState("");

  // average graph data
  const [averageGraphData, setAverageGraphData] = useState([]);

  // rerender graph
  const [rerenderGraph, setRerender] = useState(1);

  return (
    <GlobalContext.Provider
      value={{
        expanded,
        setExpanded,
        // sideBarList,
        // setSideBarList,
        sideBarClickedData,
        setSideBarClickedData,
        similar_interests,
        setSimilar_interests,
        relatedData,
        setRelatedData,
        dropdownFilterData,
        setDropdownFilterData,
        dropDownSelectedData,
        setdropDownSelectedData,
        currentYear,
        setCurrentYear,
        graphType,
        setGraphType,
        viewer,
        setViewer,
        simileIntrestData,
        setSimilarIntrest,
        showhichGrpah,
        setShowWhichGraph,
        graphData,
        setGraphData,
        actualGraphData,
        setActualGraphData,
        gloablLoading,
        setGloablLoading,
        viewerloading,
        setViewerLoading,
        loading,
        setLoading,
        secondaryGraphCountryName,
        setSecondaryGraphCountryName,
        gloablUnit,
        setGlobalUnit,
        headerLoading,
        setHeaderLoading,
        averageGraphData,
        setAverageGraphData,
        rerenderGraph,
        setRerender,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);
