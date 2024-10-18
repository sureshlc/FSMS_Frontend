import { PageContainer, Wrapper } from "./index.sc";
import Layout from "../../components/grid-layout/layout";
import { l2ViewMapping } from "../../utils";
import { useLocation } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import useQueryParams from "../../hooks/useQueryParams";
import { useQueries } from "@tanstack/react-query";
import { getIndicatorData } from "../../services";
import ContentBoxWithTabs from "../../components/ContentBoxWithTabs";
import ContentBox from "../../components/ContentBox";
import Content from "../../components/ContentBox/Content";
import Header from "../../components/Header";
import ReusableAccordion from "../../components/ReusableAccordion";
import AccordionContentWithTabs from "../../components/ContentBox/AccordionContentWithTabs";

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
        select: (res) => {
          if (Array.isArray(res)) {
            return res?.map((ele) => ele?.data?.data);
          }
          return res?.data?.data;
        },
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
        graphType={noDataImage}
      />
    );
  }

  if (userQueries.length > 1) {
    return <ContentBoxWithTabs apiData={userQueries} gridMappingData={data} />;
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
      content={
        <Content
          Graph={component}
          data={{ ...userQueries[0].data, ...data[0] }}
          isLoading={userQueries[0].isLoading}
          graphType={noDataImage}
        />
      }
      enableIcon={enableIcon}
    />
  );
};

const Consumption = () => {
  const location = useLocation();
  const { pathname } = location;
  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;
  const l2View = l2ViewMapping[pathname.substring(1)];

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

export default Consumption;
