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
            fromYear: "2012",
          }),
        enabled: !!item?.value,
        retry: 1,
        refetchOnWindowFocus: false,
        select: (res) =>
          Array.isArray(res?.data?.data) ? res?.data?.data[0] : res?.data?.data,
      };
    }),
  });

  const {
    label,
    subLabel,
    secondaryTitle,
    component,
    enableIcon,
    iconColor,
    additionalClassName,
    noDataImage,
  } = data[0];
  if (userQueries.length > 1) {
    return <ContentBoxWithTabs apiData={userQueries} gridMappingData={data} />;
  }

  return (
    <ContentBox
      title={label}
      enableIcon={enableIcon}
      iconColor={iconColor}
      secondaryTitle={userQueries[0]?.data?.unit || secondaryTitle}
      subLabel={
        userQueries[0]?.data?.is3YearAverage ? "3 Year Average" : "" || subLabel
      }
      countryIsoCode={countryId || "MASH"}
      additionalClass={additionalClassName}
      content={
        <Content
          Graph={component}
          data={{ ...userQueries[0].data, ...data[0] }}
          isLoading={userQueries[0].isLoading}
          graphType={noDataImage}
        />
      }
    />
  );
};

const FoodPrice = () => {
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
    "one one two two",
    "one one two two",
    "three three four four",
    "three three four four",
  ];
  const layoutThemeSemiLarge = [
    "one one two two",
    "one one two two",
    "three three four four",
    "three three four four",
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
          cols={4}
        />
      </Wrapper>
    </PageContainer>
  );
};

export default FoodPrice;
