import React, { useEffect, useState } from "react";
import { TabBody, TabHeading, Wrapper } from "./index.sc";
import NewTabs from "../NewTabs";
import useQueryParams from "../../hooks/useQueryParams";
import NoDataComp from "../NoDataComp";
import Loader from "../loader/Loader";
import { transformDataArr } from "./utils";

const ReusableContentWithTabs = ({ apiData, gridMappingData, isLoading }) => {
  const { getAllQueryParams } = useQueryParams();
  const { countryId } = getAllQueryParams();

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const getTabItems = (items) => {
    const tabData = items?.map((item, i) => ({
      id: i,
      title: (
        <div
          style={{
            padding: "0 10px",
          }}
        >
          {item.tabTitle}
        </div>
      ),
    }));
    setTabs(tabData);
  };

  useEffect(() => {
    if (gridMappingData) {
      getTabItems(gridMappingData);
    }
  }, [gridMappingData]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const Graph = gridMappingData && gridMappingData[activeTab]?.component;
  return (
    <Wrapper>
      <TabHeading>
        <NewTabs items={tabs} onChange={handleTabChange} />
      </TabHeading>
      <TabBody>
        {apiData[activeTab].isLoading ? (
          <div
            style={{
              width: "100%",
              height: "calc(100% - 1rem)",
              backgroundColor: "#F9FAFF",
              marginBottom: "2rem",
            }}
          >
            <Loader
              type="spinnerWithLogo"
              height={"32"}
              width={"32"}
              spinnerWidth={3}
            />
          </div>
        ) : !apiData ||
          !apiData[activeTab]?.data?.data ||
          apiData[activeTab]?.data?.data?.length === 0 ? (
          <NoDataComp graphType={gridMappingData[activeTab]?.noDataImage} />
        ) : (
          <Graph
            data={{
              ...apiData[activeTab]?.data,
              ...gridMappingData[activeTab],
              data: transformDataArr(apiData[activeTab]?.data?.data),
            }}
            selectedCountryName={countryId}
          />
        )}
      </TabBody>
    </Wrapper>
  );
};

export default ReusableContentWithTabs;
