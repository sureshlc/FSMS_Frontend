import { useEffect, useState } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import { getAlertData, getTrendData } from "../../services";
import { BoxDataContainer, TabsWrapper } from "./index.sc";
import NewTabs from "../NewTabs";
import Content from "./Content";
import { formatNumber, getIsGreen, getKeyByValue } from "../../utils";
import Header from "../Header";
import { unitsMap } from "../../constants/unitsMapping";
import { TabTitle } from "./Tabtitle";
import { TempTrendGraphData } from "../../mock-data";
import Loader from "../loader/Loader";
import MiniGraphContainer from "../MiniGraphsContainer";
import { countryIsoMapping } from "../../constants/countryIsoMapping";

const AccordionContentWithCountryTabs = ({ data: gridMappingData, isOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;
    const currentCategory = sidebarMockData.find(
        (ele) => ele?.endpoint === pathname.substring(1)
    )?.value;

    const { getAllQueryParams } = useQueryParams();
    const { countryFilter = "" } = getAllQueryParams();
    const countryName = countryFilter.split("-")[0];
    const isAllCountry = countryName === "All Mashreq Countries";

    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setActiveTab(0);
    }, [isOpen]);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    const userQueries = useQueries({
        queries: gridMappingData?.map((item) => {
            return {
                queryKey: [
                    "trendData",
                    currentCategory,
                    countryName,
                    item?.value,
                ],
                queryFn: () =>
                    getTrendData({
                        category: item?.value,
                        area: isAllCountry ? null : countryName,
                        sort: 1,
                        fromYear: "2015",
                        forecast: 2,
                    }),

                refetchOnWindowFocus: false,
                select: (res) => res?.data?.data,
            };
        }),
    });

    const { data: alertData = [] } = useQuery({
        queryKey: [
            "alertData",
            gridMappingData[0].value,
            isAllCountry ? true : false,
            isAllCountry ? null : countryName,
        ],
        queryFn: () =>
            getAlertData({
                area: isAllCountry ? null : countryName,
                category: gridMappingData[0].value,
                trend: true,
            }),
        select: (response) => {
            const res = response?.data?.data;
            const filteredRes = res.filter(
                (ele) => ele.value !== "food_security"
            );

            if (isAllCountry) {
                const finalData = [...filteredRes].map((ele) => ({
                    ...ele,
                    fixedTooltip: true,
                }));
                return finalData;
            }

            const finalData = [...filteredRes].map((ele) => ({
                ...ele,
                fixedTooltip: true,
            }));
            return finalData;
        },
        refetchOnWindowFocus: false,
    });

    const getTabItems = (items) => {
        const dummyPick = (m) => {
            const matchingObject = TempTrendGraphData.data.find(
                (item) => item.iso3_code === m
            );

            if (matchingObject) {
                return matchingObject.trend.trendData;
            }
            return null;
        };
        const tabData = items[0]?.data?.map((item, i) => {
            return {
                id: i,
                iso3_code: item.iso3_code,
                title: (
                    <TabTitle
                        item={{
                            title: item?.area,
                            iso3_code: item?.iso3_code,
                            value: item?.rank,
                            isGreen: item?.trend?.isGreen,
                            change: item?.trend?.latestYearChange,
                        }}
                    />
                ),
                value: item?.rank,
                isGreen: item?.trend?.isGreen,
                change: item?.trend?.latestYearChange,
                trendData: item?.category
                    ? item.trend?.trendData
                    : dummyPick(item.iso3_code),
            };
        });

        setTabs(tabData);
    };
    useEffect(() => {
        getTabItems(alertData);
    }, [alertData, activeTab]);

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
                value: formatNumber(
                    accordionData[0].data[data.length - 1].value
                ),
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
                        latestYearDataChange:
                            latestYearValues[`yearly_change${i}`] || 0,
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
            color: "#e8e8e8",
            units: "",
            latestYearDataChange: 0,
        });
    }

    const Graph = gridMappingData[0]?.component;
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

    const isTabsPresent = true;
    if (userQueries[0]?.isLoading)
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

    const endPoint = sidebarMockData.find(
        (ele) => ele.value === gridMappingData[0].value
    );

    const handleGraphClick = () => {
        if (!tabs) return;
        navigate(
            `/${endPoint.endpoint}?countryFilter=${getKeyByValue(
                countryIsoMapping,
                tabs[activeTab].iso3_code
            )}&countryId=${tabs[activeTab].iso3_code}`
        );
    };

    if (!isOpen) return <MiniGraphContainer data={tabs} />;

    const headerTitle = accordionData[0].find((ele) => ele?.title)?.title;
    const headerUnit = accordionData[0].find((ele) => ele?.unit)?.unit;

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
                    />
                </TabsWrapper>
            )}
            {isTabsPresent && headerTitle && (
                <Header
                    title={
                        headerTitle.charAt(0).toUpperCase() +
                        headerTitle.slice(1)
                    }
                    secondaryTitle={unitsMap(headerUnit)}
                />
            )}

            <Content
                headerHeight={isTabsPresent ? 68 : 0}
                Graph={Graph}
                // s
                isLoading={userQueries[activeTab]?.isLoading}
                data={
                    accordionData[0]
                        ? {
                              ...accordionData[0][activeTab],
                              ...gridMappingData[0],
                          }
                        : {}
                }
                graphType={gridMappingData[0].noDataImage}
                handleOnClick={handleGraphClick}
            />
        </BoxDataContainer>
    );
};

export default AccordionContentWithCountryTabs;
