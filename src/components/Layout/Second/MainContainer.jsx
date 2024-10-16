import React, { Suspense, useEffect, useState } from "react";
import Yieldlogo from "../../../assets/icons/components/Yieldlogo";
import Productionlogo from "../../../assets/icons/components/Productionlogo";
import Areaharvastedlogo from "../../../assets/icons/components/Areaharvastedlogo";
import { useGlobalData } from "../../../hooks/GlobalContext";
import Loader from "../../loader/Loader";
import Chip from "../../chip/index";
import {
  Container,
  CountryData,
  CountryValue,
  Detaildata,
  Graphboxwrapper,
  HeaderContainer,
  HeadingContainer,
  HeadingData,
  LogoData,
  MiddleContainer,
  TabBar,
  TabButtons,
  TabContent,
  TabPanel,
  Tabbar,
  Title,
  TitleBlank,
  TitleContainer,
  Yeardata,
} from "../index.sc";
import useQueryParams from "../../../hooks/useQueryParams";
import Slider from "../../rightbar/middle/Slider";
import {
  COUNTRY_ENTITY,
  GRAPH_TYPE_ENTITY,
  ITEM_ENTITY,
  SIMILAR_INTEREST_ENTITY,
} from "../../../constants/default";

const Maincontainer = ({
  tabItems,
  handleTabChange,
  detailTitle,
  initialData,
  activeTab,
  rerender,
  isLoading,
}) => {
  const [isActive, setIsActive] = useState(false);
  const minYear = 1967;
  const maxYear = 2021;
  const {
    currentYear,
    // viewer,
    // showhichGrpah,
    setShowWhichGraph,
    // dropDownSelectedData,
    setSecondaryGraphCountryName,
    headerLoading,
  } = useGlobalData();

  const queryParams = useQueryParams();
  // const currentYear = queryParams.getQueryParam("year");
  const viewer = queryParams.getQueryParam(SIMILAR_INTEREST_ENTITY);
  const showhichGrpah = queryParams.getQueryParam(GRAPH_TYPE_ENTITY);
  const secondaryGraphCountryName = queryParams.getQueryParam(COUNTRY_ENTITY);

  const [prevClickedIndex, setPrevClickedIndex] = useState(
    initialData.indexOf(detailTitle)
  );

  const currentCountry = queryParams.getQueryParam(COUNTRY_ENTITY);
  const currentItem = queryParams.getQueryParam(ITEM_ENTITY);
  //const dropDownSelectedData = { "Region/Country": country, Commodity: item };

  const handleClickSecGraphToPrimGraph = () => {
    setSecondaryGraphCountryName("");
    queryParams.setDefaultQueryParam(COUNTRY_ENTITY);
    // setShowWhichGraph("primary_graph");
    queryParams.setDefaultQueryParam(GRAPH_TYPE_ENTITY);
  };

  useEffect(() => {
    const tabContainer = document.querySelector(".tab-container");

    if (tabContainer) {
      tabContainer.classList.add("active");
      setIsActive(true);
      setTimeout(() => {
        tabContainer.classList.remove("active");
        setIsActive(false);
      }, 2000);
    }
  }, [detailTitle]);

  const currentIndex = initialData.indexOf(detailTitle);
  useEffect(() => {
    setTimeout(() => {
      setPrevClickedIndex(currentIndex);
    }, 500);
  }, []);

  const animationDirection =
    prevClickedIndex < currentIndex
      ? "right"
      : prevClickedIndex > currentIndex
      ? "left"
      : "";

  function returnLogo(el) {
    // logo at the top
    const logoObject = {
      Yield: <Yieldlogo isActive={isActive}/>,
      "Area harvested": <Areaharvastedlogo isActive={isActive}/>,
      Production: <Productionlogo isActive={isActive}/>,
    };

    return logoObject[el];
  }

  // console.log(tabItems, "tabitemsparent", viewer, "viewer");
  const currentTabItem = tabItems.find(
    (tabItem) => tabItem?.title?.toLowerCase() === viewer?.toLowerCase()
  );
  // console.log(
  //   currentTabItem,
  //   "currentTabItem",
  //   showhichGrpah,
  //   "showhichGrpah",
  //   currentTabItem?.showhichGrpah,
  //   "currentTabItem?.showhichGrpah"
  // );

  return (
    <MiddleContainer>
      <Container
        className={`tab-container ${isActive ? "active" : ""}`}
        animationDirection={animationDirection}
      >
        <HeadingContainer>
          <TitleContainer>
            <LogoData>{returnLogo(viewer ,isActive)}</LogoData>
            <HeaderContainer>
              <HeadingData>
                <Title>{viewer}</Title>
                <Detaildata>{currentItem}</Detaildata>
                <Yeardata>{currentYear}</Yeardata>{" "}
                {showhichGrpah === "secondary_graph" && (
                  <Chip
                    title={secondaryGraphCountryName}
                    style={{
                      color: "#2F3446",
                      borderColor: "#6A6A6A",
                      hoverBg: "#FCE5F1",
                      focusBg: "#FCE5F1",
                      background: "#FFFFFF",
                      fontWeight: "400",
                    }}
                    iconPosition="right"
                    onCloseClick={handleClickSecGraphToPrimGraph}
                    // onChipClick={() => alert("Chip Clicked")}
                    isCloseButtonVisible={true}
                    // type={"small"}
                  />
                )}
              </HeadingData>
              <CountryValue>
                {showhichGrpah === "primary_graph" && (
                  <CountryData>
                    {" "}
                    {currentCountry} - {currentYear}
                  </CountryData>
                )}
              </CountryValue>
            </HeaderContainer>
          </TitleContainer>
          <TabButtons>
            {currentTabItem?.iconTitle?.map((tab, index) => {
              return (
                <Tabbar
                  className={activeTab === index ? "active" : ""}
                  key={index}
                  active={activeTab === index}
                  onClick={() => handleTabChange(index)}
                >
                  {tab}
                </Tabbar>
              );
            })}
          </TabButtons>
        </HeadingContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <TabBar>
            <TabContent>
              <TabPanel active={true}>
                {activeTab === 1
                  ? currentTabItem["tertiary_graph"]
                  : currentTabItem && currentTabItem[showhichGrpah]}
              </TabPanel>
            </TabContent>
            {showhichGrpah === "primary_graph" && activeTab !== 1 && (
              <Slider minYear={minYear} maxYear={maxYear} rerender={rerender} />
            )}
          </TabBar>
        )}
      </Container>
    </MiddleContainer>
  );
};

export default Maincontainer;
