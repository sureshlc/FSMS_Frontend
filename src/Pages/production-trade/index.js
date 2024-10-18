import { PageContainer, Wrapper } from "./index.sc";
import Layout from "../../components/grid-layout/layout";
import { l2ViewMapping } from "../../utils";
import { useLocation } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import useQueryParams from "../../hooks/useQueryParams";
import { useQueries } from "@tanstack/react-query";
import { getIndicatorData } from "../../services";
import ReusableAccordion from "../../components/ReusableAccordion";
import Header from "../../components/Header";
import AccordionContentWithTabs from "../../components/ContentBox/AccordionContentWithTabs";
import ContentBoxWithTabs from "../../components/ContentBoxWithTabs";
import ContentBox from "../../components/ContentBox";
import Content from "../../components/ContentBox/Content";

const Widget = ({ pos, data, category }) => {
  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "", countryId } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];

  const userQueries = useQueries({
    queries: data.map((item) => {
      return {
        queryKey: ["widgetData", category, countryName, item?.value],
        queryFn: () =>
          getIndicatorData({
            category,
            area: countryName,
            indicator: item?.value,
            fromYear: "2011",
            forecast: 2,
          }),
        enabled: !!item?.value,
        refetchOnWindowFocus: false,
        select: (res) => res?.data?.data,
      };
    }),
  });

  const {
    label,
    subLabel,
    secondaryTitle,
    component,
    type,
    info,
    fill,
    enableIcon,
    iconColor,
    additionalClassName,
    noDataImage,
  } = data[0];
  if (type === "accordion") {
    return (
      <ReusableAccordion
        data={Object.keys(data[0].items).map((key) => data[0].items[key])}
        activeHeight="55"
        titleComponent={Header}
        bodyComponent={AccordionContentWithTabs}
        info={info}
        fill={fill}
      />
    );
  }

  if (userQueries.length > 1) {
    return (
      <ContentBoxWithTabs
        apiData={userQueries}
        gridMappingData={data}
        info={info}
      />
    );
  }

  return (
    <ContentBox
      title={label}
      secondaryTitle={userQueries[0]?.data?.unit || secondaryTitle}
      subLabel={
        userQueries[0]?.data?.is3YearAverage ? "3 Year Average" : "" || subLabel
      }
      countryIsoCode={countryId || "MASH"}
      additionalClass={additionalClassName}
      info={info}
      enableIcon={enableIcon}
      iconColor={iconColor}
      content={
        <Content
          Graph={component}
          data={{ ...userQueries[0].data, ...data[0] }}
          isLoading={userQueries[0].isLoading}
          info={info}
          graphType={noDataImage}
        />
      }
    />
  );
};

const ProductionTrade = () => {
  const location = useLocation();
  const { pathname } = location;
  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;
  const l2View = l2ViewMapping[currentCategory];

  const layoutWidgets = Object.entries(l2View).map(([key, value]) => ({
    className: key,
    value: value,
    category: currentCategory,
    widget: <Widget pos={key} data={value} category={currentCategory} />,
    additionalClass: "box",
  }));

  const layoutTheme = [
    "one one one three three",
    "one one one three three",
    "two two two three three",
    "two two two three three",
  ];
  const layoutThemeSemiLarge = [
    "one one three three",
    "one one three three",
    "two two three three",
    "two two three three",
  ];

  return (
    <PageContainer>
      <Wrapper>
        <Layout
          rowHeight="20"
          layoutThemeMobile={[]}
          layoutTheme={layoutTheme}
          layoutThemeSemiLarge={layoutThemeSemiLarge}
          widgets={layoutWidgets}
          cols={5}
        />
      </Wrapper>
    </PageContainer>
  );
};

export default ProductionTrade;
