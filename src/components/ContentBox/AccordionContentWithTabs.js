import React, { useEffect, useState } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import { useQueries } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import { getIndicatorData } from "../../services";
import {
  AccordionItem,
  AccordionWrapper,
  BoxContainer,
  AcordionData,
  TrendValue,
  InfoContainer,
  InfoValues,
  InfoLabel,
  InfoValue,
  ToTalValue,
  LatestYearContainer,
  ProgressBarContainer,
  LatestTotal,
  TabHeading,
  BoxDataContainer,
  TabsWrapper,
} from "./index.sc";
// import Tabs from "../tabs";
import NewTabs from "../NewTabs";
import Content from "./Content";
import { InfoSection, InfoSectionWrapper, Numbers } from "../box-l3/index.sc";
import { InfoTitle } from "../Layout/index.sc";
import { formatNumber, getIsGreen } from "../../utils";
import Progressbar from "../progressbar";
import { TrendDirection } from "../../assets/icons";
import Header from "../Header";
import { unitsMap } from "../../constants/unitsMapping";
import Loader from "../loader/Loader";

const AccordionContentWithTabs = ({ data: gridMappingData, isOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;
  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "" } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [totalSum, setTotalSum] = useState(0);

  const getTabItems = (items) => {
    const tabData = items?.map((item, i) => ({
      id: i,
      title: item.tabTitle,
    }));
    setTabs(tabData);
  };

  useEffect(() => {
    getTabItems(gridMappingData);
  }, [gridMappingData, activeTab]);

  useEffect(() => {
    setActiveTab(0);
  }, [isOpen]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const userQueries = useQueries({
    queries: gridMappingData.map((item) => {
      return {
        queryKey: ["accordionData", currentCategory, countryName, item?.value],
        queryFn: () =>
          getIndicatorData({
            category: currentCategory,
            area: countryName,
            indicator: item?.value,
            fromYear: "2015",
            forecast: 3, //2024_10_02: Forecast till 2027
          }),
        enabled: !!item?.value,
        refetchOnWindowFocus: false,
        select: (res) => res?.data?.data,
      };
    }),
  });

  const accordionData = [];
  if (userQueries?.length > 0) {
    for (let i = 0; i < userQueries.length; i++) {
      const queryData = userQueries[i]?.data;
      if (queryData) {
        accordionData.push(queryData);
      }
    }
  }

  let latestYearValues = accordionData[activeTab]?.data?.find(
    (ele) => ele.year === accordionData[activeTab].latestYear
  );
  const latestYearData = [];

  if (accordionData[0]?.items?.length) {
    if (accordionData[0].is2dData === false) {
      const data = accordionData[0].data;

      latestYearData.push({
        label: accordionData[0].items[0],
        value: formatNumber(accordionData[0].data[data.length - 1].value),
        color: gridMappingData[0].colors[0],
        units: unitsMap(accordionData[0].unit),
        latestYearDataChange: accordionData[0].latestYearChange,
        isGreen: getIsGreen(
          accordionData[0]?.isPositive,
          accordionData[0].latestYearChange
        ),
      });
    } else {
      accordionData[0].items.forEach((ele, i) => {
        try {
          latestYearData.push({
            label: ele,
            value: formatNumber(latestYearValues[`value${i}`]) || 0,
            color: gridMappingData[0].colors[i],
            units: unitsMap(accordionData[0].unit) || "",
            latestYearDataChange: latestYearValues[`yearly_change${i}`] || 0,
            isGreen: getIsGreen(
              accordionData[0]?.isPositive,
              latestYearValues[`yearly_change${i}`] || 0
            ),
          });
        } catch (error) {
          latestYearData.push({
            label: ele,
            value: 0,
            color: gridMappingData[0].colors[i],
            units: "",
            latestYearDataChange: 0,
          });
        }
      });
    }
  } else {
    latestYearData.push({
      label: 0,
      value: 0,
      color: gridMappingData[0].colors[0],
      units: "",
      latestYearDataChange: 0,
    });
  }

  useEffect(() => {
    if (!accordionData[0]) return;
    if (accordionData[0]?.is2dData === false) {
      setTotalSum(
        formatNumber(
          accordionData[0].data[accordionData[0].data.length - 1].value
        )
      );
    } else {
      let sum = 0;

      accordionData[0]?.is2dData === false
        ? formatNumber(accordionData[0].data.value)
        : accordionData[0]?.items?.forEach((ele, i) => {
            sum += latestYearValues[`value${i}`];
          });
      setTotalSum(sum);
    }
  }, [accordionData]);

  const Graph = gridMappingData[activeTab]?.component;
  const defaultLatestYearValues = {
    value0: 0,
    value1: 0,
    value2: 0,
    // Add more properties as needed
  };

  if (!latestYearValues) {
    latestYearValues = defaultLatestYearValues;
  } else {
    // Check and update each property
    if (isNaN(latestYearValues.value0)) {
      latestYearValues.value0 = 0;
    }

    if (isNaN(latestYearValues.value1)) {
      latestYearValues.value1 = 0;
    }

    if (isNaN(latestYearValues.value2)) {
      latestYearValues.value2 = 0;
    }
    // Add more property checks if needed
  }

  if (userQueries[0].isLoading)
    return (
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
    );

  const isTabsPresent = gridMappingData.length > 1;

  if (!isOpen)
    return (
      <AccordionWrapper>
        <LatestYearContainer>
          <LatestTotal>
            <span> {accordionData[activeTab]?.latestYear}</span>
            <ToTalValue>
              <div>{gridMappingData[activeTab]?.tabTitle} - </div>
              <div className="value">{formatNumber(totalSum || 0)}</div>{" "}
              <div>{accordionData[0]?.unit} </div>
            </ToTalValue>
          </LatestTotal>
          <ProgressBarContainer>
            <Progressbar data={latestYearData} />
          </ProgressBarContainer>
        </LatestYearContainer>
        <AcordionData>
          {latestYearData?.map((ele, i) => (
            <AccordionItem key={i}>
              {ele.value === 0 ? (
                <InfoLabel color={"#E9EBF5"}>
                  <div></div>
                  {ele.label}
                </InfoLabel>
              ) : (
                <InfoLabel color={ele?.color}>
                  <div></div>
                  {ele.label}
                </InfoLabel>
              )}
              <InfoContainer>
                <InfoValues>
                  <div>{ele.value}</div>
                  <span>
                    {ele.units}{" "}
                    {ele.latestYearDataChange ? (
                      <TrendDirection
                        value={ele?.latestYearDataChange}
                        color={ele?.isGreen ? "#48C84E" : "#EE4242"}
                        size="0.875rem"
                      />
                    ) : null}
                  </span>
                  <TrendValue></TrendValue>
                </InfoValues>
              </InfoContainer>
            </AccordionItem>
          ))}
        </AcordionData>
      </AccordionWrapper>
    );

  return (
    <BoxDataContainer isChild={true}>
      {isTabsPresent && (
        <TabsWrapper>
          <NewTabs
            variant="card"
            items={tabs}
            onChange={handleTabChange}
            activeColor="#009EDB"
            isContent={false}
            activeIndex={activeTab}
          />
        </TabsWrapper>
      )}
      {isTabsPresent && (
        <Header
          title={gridMappingData[activeTab]?.title}
          secondaryTitle={unitsMap(accordionData[activeTab]?.unit)}
          subLabel={
            accordionData[activeTab]?.is3YearAverage ? "3 years average" : ""
          }
        />
      )}

      <Content
        headerHeight={
          isTabsPresent
            ? accordionData[activeTab]?.is3YearAverage
              ? 68 + 15
              : 68
            : 0
        }
        Graph={Graph}
        isLoading={userQueries[activeTab]?.isLoading}
        data={{
          ...accordionData[activeTab],
          ...gridMappingData[activeTab],
        }}
        graphType={gridMappingData[activeTab]?.noDataImage}
      />
    </BoxDataContainer>
  );
};

export default AccordionContentWithTabs;
