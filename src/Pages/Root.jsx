import { useState, useRef } from "react";
import styled from "styled-components";
import Rightbar from "../components/rightbar/nav/Rightbar";
import LeftSidebar from "./home/LeftSidebar";
import GraphComponent from "./GraphComponent";
import { useLocation } from "react-router";
import useQueryParams from "../hooks/useQueryParams";

const Root = () => {
  // handling leftsidebar
  const [isRecentCollapsed, setIsRecentCollapsed] = useState(false);
  const [expandedleft, setExpandedleft] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);

  const location = useLocation();
  const { pathname } = location;

  const { getAllQueryParams } = useQueryParams();
  const { mapView = false } = getAllQueryParams();

  // graph container
  const graphContainerRef = useRef(null);

  // FIXME: graph resize on changing
  // useEffect(() => {
  //   const container = graphContainerRef.current;
  //   const handleResize = () => {
  //     setRerender((p) => p + 1);
  //   };
  //   const resizeObserver = new ResizeObserver(handleResize);
  //   if (container) {
  //     resizeObserver.observe(container);
  //   }
  //   return () => {
  //     if (container) {
  //       resizeObserver.unobserve(container);
  //     }
  //   };
  // }, []);

  // handle rerender

  const toggleCategoryList = () => {
    // if (pathname.substring(1) === "Overview") {
    //   setShowCategoryList((old) => !old);
    // }
  };

  // useEffect(() => {
  //   if (mapView === "true") {
  //     setShowCategoryList(false);
  //   } else {
  //     setShowCategoryList(true);
  //   }
  // }, [mapView]);

  return (
    <Container showCategoryList={showCategoryList}>
      <Rightbar
        isRecentCollapsed={isRecentCollapsed}
        toggleCategoryList={toggleCategoryList}
      />
      <Wrapper
        showCategoryList={showCategoryList}
        mapView={JSON.parse(mapView)}
      >
        <LeftSidebar
          isRecentCollapsed={isRecentCollapsed}
          setIsRecentCollapsed={setIsRecentCollapsed}
          expandedleft={expandedleft}
          setExpandedleft={setExpandedleft}
          showCategoryList={showCategoryList}
        />
        <MainContainer
          ref={graphContainerRef}
          showCategoryList={showCategoryList}
          mapView={JSON.parse(mapView)}
        >
          {/* <Rightbar isRecentCollapsed={isRecentCollapsed} /> */}
          <GraphComponent isRecentCollapsed={isRecentCollapsed} />
          {/* <BottomComponent isRecentCollapsed={isRecentCollapsed} /> */}
        </MainContainer>
      </Wrapper>
    </Container>
  );
};

export default Root;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(248, 248, 248);
  /* overflow: hidden; */
  .fao-header {
    background-color: ${({ showCategoryList }) =>
      showCategoryList ? "#f2f3f9" : "#fff"};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 3.5rem);
  display: flex;
  position: relative;
  .map-container {
    width: ${({ showCategoryList, mapView }) => {
      if (showCategoryList && !mapView) {
        return "calc(100% - 33% - 16rem)";
      } else if (!showCategoryList && !mapView) {
        return "calc(100% - 35%)";
      } else if (mapView) {
        return "100%";
      } else {
        return "100%";
      }
    }};

    margin-left: ${({ showCategoryList, mapView }) =>
      showCategoryList && !mapView ? "16rem" : "0"};
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 7px solid #009edb; */
  /* gap: 0.5rem; */
  height: 100%;

  width: calc(100% - 16rem);
  // margin-left: auto;
  background: rgba(248, 248, 248);
  /* padding-left: 19rem; */
  /* z-index: 0; */
  /* margin-left: 4rem; */
  transition: all 0.4s ease-out;

  &.f-width {
    width: 100%;
  }

  .map-dd {
    transition: all 0.4s ease;
    left: ${({ showCategoryList }) => (showCategoryList ? "18rem" : "2rem")};
  }

  .map-legend {
    transition: all 0.4s ease;
    width: ${({ showCategoryList, mapView }) => {
      if (showCategoryList && !mapView) {
        return "calc(100% - 33.8% - 17.94rem)";
      } else if (!showCategoryList && !mapView) {
        return "calc(100% - 35% - 1.94rem)";
      } else if (mapView) {
        return "100%";
      } else {
        return "100%";
      }
    }};
    margin-right: 1rem;

    margin-left: ${({ showCategoryList, mapView }) =>
      showCategoryList && !mapView ? "17rem" : "1rem"};
  }

  &.expand {
    margin-left: 4rem;
    width: 100%;
    height: 100vh;
    padding-left: 2%;
    transition: all 0.4s ease-out;
  }
`;
