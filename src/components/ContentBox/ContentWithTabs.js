import React, { useEffect, useMemo, useState } from "react";
import Tabs from "../tabs";
import { TabBody, TabHeading, TabsWrapper, Wrapper } from "./index.sc";
import { getIndicatorData } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { countryIsoMapping } from "../../constants/countryIsoMapping";
import Loader from "../loader/Loader";
import { useLocation, useNavigate } from "react-router";
import NoDataComp from "../NoDataComp";
import NewTabs from "../NewTabs";
import { TabTitle } from "./Tabtitle";
import { sidebarMockData } from "../../mock-data/sidebar";
import { transformDataArr } from "./utils";



const ContentWithTabs = ({
  Graph,
  tabsData: mapData,
  data: gridMappingData,
  category,
}) => {
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [tabs, setTabs] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const {
    data: indicatorData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["indicatorData", selectedCountryName],
    queryFn: () =>
      getIndicatorData({
        category,
        area: selectedCountryName,
        indicator: gridMappingData?.value,
        fromYear: "2016",
        // forecast: 2,
      }),
    select: (res) => res?.data?.data,
    refetchOnWindowFocus: false,
  });

  const getTabItems = (items) => {
    const tabData = items?.map((item, i) => {
      return {
        id: i,

        iso3_code: item.iso3_code,
        title: (
          <TabTitle
            item={{
              title: item?.area,
              iso3_code: item?.iso3_code,
              value: item?.rank,
              change: item?.trend.latestYearChange,
              isGreen: item?.trend?.isGreen,
            }}
          />
        ),
        value: item?.rank,
      };
    });
    setTabs(tabData);
  };

  const countryList = useMemo(
    () => mapData?.map((ele) => ele?.area),
    [mapData]
  );

  useEffect(() => {
    if (mapData) {
      setSelectedCountryName(mapData[0]?.area);
      getTabItems(mapData.filter((ele) => countryList.includes(ele?.area)));
    }
  }, [mapData]);

  const handleTabChange = (tab) => {
    setSelectedCountryName(countryList[tab]);
  };

  const endPoint = sidebarMockData.find(
    (ele) => ele.value === gridMappingData.category
  );

  const handleGraphClick = () => {
    navigate(
      `/${endPoint.endpoint}?countryFilter=${selectedCountryName}&countryId=${countryIsoMapping[selectedCountryName]}`
    );
  };
  return (
    <Wrapper>
      <TabHeading isOverview={pathname.substring(1) === "Overview"}>
        <NewTabs items={tabs} onChange={handleTabChange} />
      </TabHeading>
      <TabBody onClick={handleGraphClick}>
        {isLoading || isFetching ? (
          <Loader
            type="spinnerWithLogo"
            height={"32"}
            width={"32"}
            spinnerWidth={3}
          />
        ) : !indicatorData?.data || indicatorData?.data?.length === 0 ? (
          <NoDataComp graphType={gridMappingData.noDataImage} />
        ) : (
          Graph && (
            <Graph
              data={{
                ...indicatorData,
                ...gridMappingData,
                data: transformDataArr(indicatorData.data),
              }}
              selectedCountryName={countryIsoMapping[selectedCountryName]}
            />
          )
        )}
      </TabBody>
    </Wrapper>
  );
};

export default ContentWithTabs;
