import {
  Container,
  MiddleContainer,
  FirstLayoutContainer,
  Sourcecontainer,
} from "../../index.sc";
import useQueryParams from "../../../../hooks/useQueryParams";
import { Wrapper } from "../../../grid-layout/style";
import Layout from "../../../grid-layout/layout";
import { useLocation } from "react-router";
import { l2ViewMapping } from "../../../../utils";
import { getIndicatorData } from "../../../../services";
import { useQueries } from "@tanstack/react-query";
import { sidebarMockData } from "../../../../mock-data/sidebar";
import ContentBox from "../../../ContentBox";
import Content from "../../../ContentBox/Content";
import ContentBoxWithTabs from "../../../ContentBoxWithTabs";

const Widget = ({ pos, data, category }) => {
  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "", countryId } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];
  const userQueries = useQueries({
    queries: data.map((item) => {
      if (item?.value === "Prevalence of undernourishment") {
        return {
          queryKey: ["widgetData", category, countryName, item?.value],
          queryFn: () =>
            getIndicatorData({
              category,
              area: countryName,
              indicator: item?.value,
              fromYear: "2015",
              // forecast: 2,
            }),
          enabled: !!item?.value,
          refetchOnWindowFocus: false,
          select: (res) => res?.data?.data,
        };
      }
      return {
        queryKey: ["widgetData", category, countryName, item?.value],
        queryFn: () =>
          getIndicatorData({
            category,
            area: countryName,
            indicator: item?.value,
            fromYear: "2011",
          }),
        enabled: !!item?.value,
        refetchOnWindowFocus: false,
        select: (res) => res?.data?.data,
      };
    }),
  });

  if (userQueries.length > 1) {
    return (
      <ContentBoxWithTabs
        apiData={userQueries}
        gridMappingData={data}
        info={data[0]?.info}
      />
    );
  }

  const {
    label,
    subLabel,
    secondaryTitle,
    component,
    additionalClassName,
    info,
    smallbox,
    noDataImage,
  } = data[0];
  return (
    <ContentBox
      title={label}
      secondaryTitle={userQueries[0]?.unit || secondaryTitle}
      additionalClass={additionalClassName}
      subLabel={
        userQueries[0]?.is3yearAverage ? "3 years average" : "" || subLabel
      }
      countryIsoCode={countryId || "MASH"}
      info={info}
      content={
        <Content
          graphType={noDataImage}
          Graph={component}
          data={{ ...userQueries[0]?.data, ...data[0] }}
          isLoading={userQueries[0]?.isLoading}
          info={info}
          smallbox={smallbox}
        />
      }
    />
  );

  // return <Component data={widgetData} />;
};

const MainContainer = () => {
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
      widget: <Widget pos={key} data={value} category={currentCategory} />,
      additionalClass: "box",
    };
  });

  const layoutTheme = [
    "one one one three four",
    "one one one five six",
    "two two two seven seven",
    "two two two seven seven",
  ];

  const layoutThemeSemiLarge = [
    "one one three four",
    "one one five six",
    "two two seven seven",
    "two two seven seven",
  ];

  return (
    <MiddleContainer>
      <Container>
        <FirstLayoutContainer>
          <Wrapper>
            <Layout
              rowHeight="20.4"
              layoutThemeMobile={[]}
              layoutTheme={layoutTheme}
              layoutThemeSemiLarge={layoutThemeSemiLarge}
              widgets={layoutWidgets}
              cols={5}
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

export default MainContainer;
