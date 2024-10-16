import React, { Suspense, lazy, useState } from "react";
import {
  Container,
  MiddleContainer,
  FirstLayoutContainer,
  NoDataview,
  Sourcecontainer,
} from "../../index.sc";
import { sidebarMockData } from "../../../../mock-data/sidebar";
import useQueryParams from "../../../../hooks/useQueryParams";

import { useQuery } from "@tanstack/react-query";
import { getAlertData } from "../../../../services";
import { l2ViewMapping } from "../../../../utils";
import { rightSectionMockData } from "../../../../mock-data";
import { Wrapper } from "../../../grid-layout/style";
import Layout from "../../../grid-layout/layout";
import { useLocation } from "react-router";
import ContentBox from "../../../ContentBox";
import ContentWithTabs from "../../../ContentBox/ContentWithTabs";
import Header from "../../../Header";
import NewAccordion from "../../../new-accordion";
import Loader from "../../../loader/Loader";
import NoDataComp from "../../../NoDataComp";
import ReusableAccordion from "../../../ReusableAccordion";
import AccordionContentWithTabs from "../../../ContentBox/AccordionContentWithTabs";
import AccordionContentWithCountryTabs from "../../../ContentBox/AccordionContentWithCountryTabs";
import MapPlaceholder from "../../../../assets/Placeholder/Map.png";
import mapplaceholder from "../../../../assets/Placeholder/mapplaceholder.svg";
import mapdataview from "../../../../assets/Placeholder/mapnodataview.svg";
// import SimpleMap from "../../../simple-map";
const SimpleMap = lazy(() => import("../../../simple-map"));

const Widget = ({ pos, value, category }) => {
  const { getAllQueryParams } = useQueryParams();
  const queryParams = useQueryParams();
  const { countryFilter = "", countryId } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];
  const categoryParam = queryParams.getQueryParam("selectedOption");
  const [selectedOption, setSelectedOption] = useState(
    categoryParam || "food_security"
  );
  const isAllCountry = countryName === "All Mashreq Countries";

  const {
    data: mapData = [],
    status,
    isFetching,
  } = useQuery({
    queryKey: ["mapData", selectedOption, countryName],
    queryFn: () =>
      getAlertData({
        // threshold: false,
        area: isAllCountry ? null : countryName,
        category: selectedOption,
        trend: true,
      }),
    select: (response) => {
      const res = response?.data?.data;
      const categoryData = res.find((ele) => ele?.value === selectedOption);
      const finalData = categoryData?.data?.map((item) => ({
        ...item,
        id: item?.iso3_code,
        value: item?.rank,
        latitude: item?.latitude,
        longitude: item?.longitude,
      }));
      return finalData || [];
    },
    refetchOnWindowFocus: false,
  });

  const {
    label,
    enableIcon,
    iconColor,
    secondaryTitle,
    subLabel,
    type,
    additionalClassName,
    component,
    noDataImage,
    info,
  } = value[0];

  if (type === "map") {
    return status === "pending" ? (
      <div
        style={{
          width: "100%",
          height: "100%",
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
    ) : status === "error" ? (
      <>
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={mapplaceholder}
          alt=""
          srcset=""
        />
        <NoDataview>
          <img src={mapdataview} />
        </NoDataview>
      </>
    ) : !mapData || mapData?.length === 0 ? (
      <NoDataComp />
    ) : (
      <Suspense
        fallback={
          <Loader
            type="spinnerWithLogo"
            height={"32"}
            width={"32"}
            spinnerWidth={3}
          />
        }
      >
        <SimpleMap
          data={mapData}
          countryIsoCode={isAllCountry ? "MASH" : countryId}
          info={info}
        />
      </Suspense>
    );
  }

  if (type === "accordion") {
    return (
      <ReusableAccordion
        data={Object.keys(value[0].items).map((key) => value[0].items[key])}
        activeHeight="55"
        titleComponent={Header}
        bodyComponent={AccordionContentWithCountryTabs}
        info={info}
        graphType={noDataImage}
      />
    );
  }

  return (
    <ContentBox
      title={label}
      enableIcon={enableIcon}
      iconColor={iconColor}
      secondaryTitle={secondaryTitle}
      subLabel={subLabel}
      countryIsoCode={isAllCountry ? "MASH" : countryId}
      additionalClass={additionalClassName}
      info={info}
      content={
        <ContentWithTabs
          Graph={component}
          data={value[0]}
          category={selectedOption}
          tabsData={mapData}
          graphType={noDataImage}
        />
      }
    />
  );

  // const Component = overviewl2ViewWidgets[pos];
  // return <Component data={mapData} value={value} category={selectedOption} />;
};

const Maincontainer = ({ year, prevalenceKeys }) => {
  const layoutTheme = [
    "one one one three three",
    "one one one three three",
    "one one one three three",
    "one one one three three",

    "two two two three three",

    "two two two three three",
  ];

  const layoutThemeSemiLarge = [
    "one one  three three",
    "one one  three three",
    "one one  three three",
    "two two  three three",
    "two two  three three",

    "two two  three three",
  ];

  const location = useLocation();
  const { pathname } = location;
  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;

  const l2View = l2ViewMapping[pathname.substring(1)];

  const layoutWidgets = Object.entries(l2View).map(([key, value]) => {
    return {
      className: key,
      value: value,
      category: currentCategory,
      widget: <Widget pos={key} value={value} category={currentCategory} />,
      additionalClass: "box",
    };
  });

  return (
    <MiddleContainer>
      <Container>
        <FirstLayoutContainer>
          <Wrapper>
            <Layout
              rowHeight="12.9"
              layoutThemeMobile={[]}
              layoutTheme={layoutTheme}
              layoutThemeSemiLarge={layoutThemeSemiLarge}
              widgets={layoutWidgets}
              cols={5}
              // handleSelectWidget={handleSelectWidget}
            />
          </Wrapper>
        </FirstLayoutContainer>
        <Sourcecontainer>
          <span>Source and metadata: FAOSTAT</span>
        </Sourcecontainer>
      </Container>
    </MiddleContainer>
  );
};

export default Maincontainer;
