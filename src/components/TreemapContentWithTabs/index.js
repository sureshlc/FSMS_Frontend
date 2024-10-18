import React, { useEffect, useState } from "react";
import { Wrapper, GraphWrapper, TabsWrapper } from "./index.sc";
import Tabs from "../tabs";
import { countryIsoMapping } from "../../constants/countryIsoMapping";
import NoDataComp from "../NoDataComp";
import Loader from "../loader/Loader";

const TreeMapContentWithTabs = ({
  Graph,
  data,
  isLoading,
  onYearTabChange,
  graphType,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    console.log("[index.js--[19]], data", data);
    if (data && data?.data && data?.data.length > 0) {
      const latestYearIndex = data?.data?.findIndex(
        (ele) => ele?.year === data?.latestYear
      );
      setActiveTab(latestYearIndex);
      onYearTabChange && onYearTabChange(data?.data[latestYearIndex]?.year);
    }
  }, [isLoading]);

  const handleTabChange = (index) => {
    setActiveTab(index);

    onYearTabChange && onYearTabChange(data?.data[index]?.year);
  };

  const getTabItems = (items) =>
    items?.map((ele, i) => ({
      id: i,
      title: i === 0 ? ele.year : ele.year.slice(-2),
    }));

  useEffect(() => {
    if (data && data?.data && data?.data.length > 0) {
      setTabs(getTabItems(data?.data));
    }
  }, [data]);
  return (
    <Wrapper>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "1rem",

            backgroundColor: "#F9FAFF",
          }}
        >
          <Loader
            type="spinnerWithLogo"
            height={"32"}
            width={"32"}
            spinnerWidth={3}
          />
        </div>
      ) : !data?.data ? (
        <Wrapper>
          <NoDataComp graphType={graphType} />
        </Wrapper>
      ) : (
        <Wrapper>
          <GraphWrapper>
            {
              <Graph
                data={{ ...data, data: data?.data[activeTab] }}
                selectedCountryName={countryIsoMapping[data?.area]}
              />
            }
          </GraphWrapper>
          <TabsWrapper className="tree-map-tabs">
            <Tabs
              variant="card"
              items={tabs}
              onChange={handleTabChange}
              activeColor="#000"
              isContent={false}
              defaultActiveTab={activeTab}
            />
          </TabsWrapper>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default TreeMapContentWithTabs;
