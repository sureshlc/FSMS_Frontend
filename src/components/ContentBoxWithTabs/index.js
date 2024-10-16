import React, { useEffect, useState } from "react";
import { BoxBody, BoxContainer, TabHeading } from "../ContentBox/index.sc";
// import Tabs from "../tabs";
import NewTabs from "../NewTabs";
import useQueryParams from "../../hooks/useQueryParams";
import SyriaFlag from "../../assets/icons/components/flags/Syria.js";
import EgyptFlag from "../../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../../assets/icons/components/flags/Mash.js";
import { CountryFlagWrapper, CountryName } from "../Header/index.sc";
import Header from "../Header";
import ContentBox from "../ContentBox";
import Content from "../ContentBox/Content.js";
import DynamicBarGraph from "../../Graphs/ChartJsGraphs/BarGraph";
import TreeMapGraph from "../../Graphs/ChartJsGraphs/TreemapGraph";
import BarGraphIcon from "../../assets/icons/components/BarGraphIcon";
import TreeMapIcon from "../../assets/icons/components/TreeMapIcon";
import DummyContent from "../DummyContent";
import TreeMapContentWithTabs from "../TreemapContentWithTabs";
import Popover from "../Popover";
import InfoIcon from "../../assets/icons/components/InfoIcon";
import { unitsMap } from "../../constants/unitsMapping";

const ContentBoxWithTabs = ({ apiData, gridMappingData }) => {
  const [tabs, setTabs] = useState([]);

  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "", countryId } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];
  const isAllCountry = countryName === "All Mashreq Countries";
  const [activeTab, setActiveTab] = useState(0);
  const [activeGraphTab, setActiveGraphTab] = useState(0);
  const [activeYear, setActiveYear] = useState(null);
  const isoFlagMapping = {
    SYR: <SyriaFlag />,
    EGY: <EgyptFlag />,
    IRQ: <IraqFlag />,
    JOR: <JordanFlag />,
    LBN: <LebanonFlag />,
    PSE: <PalestineFlag />,
    MASH: <MASHFlag />,
  };

  const graphTabItems = [
    {
      id: 0,
      title: (
        <TreeMapIcon fill={activeGraphTab === 0 ? "#141630" : "#7B8092"} />
      ),
    },
    {
      id: 1,
      title: (
        <BarGraphIcon fill={activeGraphTab === 1 ? "#141630" : "#7B8092"} />
      ),
    },
  ];

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
    if (apiData) {
      getTabItems(gridMappingData);
    }
  }, [apiData]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleGraphTabChange = (index) => {
    setActiveGraphTab(index);
  };

  const handleYearTabChange = (year) => {
    setActiveYear(year);
  };

  const some = gridMappingData.findIndex((item) => {
    return item.label.includes(
      "Prevalence of severe or moderate food insecurity"
    );
  });

  return (
    <BoxContainer>
      <TabHeading>
        <NewTabs
          variant="card"
          items={tabs}
          onChange={handleTabChange}
          activeColor="#009EDB"
          isContent={false}
        />
        {countryId && (
          <CountryFlagWrapper>
            {gridMappingData[activeTab].info && (
              <Popover
                content={gridMappingData[activeTab].info}
                placement="bottomRight"
                spacing={10}
                styles={{
                  border: "1px solid #009EDB",
                }}
                trigger="hover"
              >
                <InfoIcon size="14" />
              </Popover>
            )}
            <CountryName
              className={`country-code ${isAllCountry === "MASH" && "MASH"
                }`}
            >
              {countryId}
            </CountryName>
            {isoFlagMapping[countryId]}
          </CountryFlagWrapper>
        )}
      </TabHeading>
      <div
        style={{
          height: "calc(100% -  2.25rem - 1.06rem)",
        }}
      >
        <ContentBox
          title={gridMappingData[activeTab]?.label}
          secondaryTitle={
            unitsMap(
              apiData[activeTab]?.data?.length
                ? apiData[activeTab]?.data[activeGraphTab]?.unit
                : apiData[activeTab]?.data?.unit
            ) || gridMappingData[activeTab]?.secondaryTitle
          }
          subLabel={
            apiData[activeTab]?.data?.is3YearAverage ? "3 years average" : ""
          }
          isChild={true}
          additionalClass={gridMappingData[0].additionalClassName}
          graphTabs={
            Array.isArray(gridMappingData[activeTab]?.component) &&
            graphTabItems
          }
          onGraphTabsChange={handleGraphTabChange}
          activeYear={activeYear}
          content={
            Array.isArray(gridMappingData[activeTab]?.component) ? (
              [
                <TreeMapContentWithTabs
                  Graph={gridMappingData[activeTab]?.component[0]}
                  graphType={
                    gridMappingData[activeTab].noDataImage[activeGraphTab]
                  }
                  data={
                    apiData[activeTab]?.data
                      ? {
                        ...apiData[activeTab]?.data[0],
                        ...gridMappingData[activeTab],
                      }
                      : null
                  }
                  isLoading={apiData[activeTab].isLoading}
                  onYearTabChange={handleYearTabChange}
                />,
                <Content
                  Graph={gridMappingData[activeTab]?.component[1]}
                  graphType={
                    gridMappingData[activeTab].noDataImage[activeGraphTab]
                  }
                  data={
                    apiData[activeTab]?.data
                      ? {
                        ...apiData[activeTab]?.data[1],
                        ...gridMappingData[activeTab],
                      }
                      : null
                  }
                  isLoading={apiData[activeTab].isLoading}
                />,
              ][activeGraphTab]
            ) : (
              <Content
                Graph={gridMappingData[activeTab]?.component}
                graphType={gridMappingData[activeTab].noDataImage}
                data={{
                  ...apiData[activeTab].data,
                  ...gridMappingData[activeTab],
                }}
                isLoading={apiData[activeTab].isLoading}
                showTotalInTooltip={
                  gridMappingData[activeTab]?.showTotalInTooltip
                }
              />
            )
          }
        />
      </div>
    </BoxContainer>
  );
};

export default ContentBoxWithTabs;
