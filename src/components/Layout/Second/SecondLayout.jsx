import React, { useState } from "react";
import { styled } from "styled-components";
import GraphBottom from "../../rightbar/middle/GraphBottom";
import Maincontainer from "./MainContainer";

// TODO: make generic and handle loading state for graph bottom

const SecondLayout = ({
  tabItems,
  handleTabChange,
  detailTitle,
  initialData,
  activeTab,
  rerender,
  isLoading,
}) => {
  return (
    <Wrapper>
      <Top>
        <Maincontainer
          tabItems={tabItems}
          // tabItems={tabItems}
          handleTabChange={handleTabChange}
          detailTitle={detailTitle}
          initialData={initialData}
          // onBoxTitleChange={handleBoxTitleChange}
          activeTab={activeTab}
          rerender={rerender}
          isLoading={isLoading}
        />
      </Top>
      <Bottom>
        {/* {items?.map((el, i) => {
          return <MappedDiv onClick={() => setIndex(i)}>{el.item}</MappedDiv>;
        })} */}
        <GraphBottom />
      </Bottom>
    </Wrapper>
  );
};

export default SecondLayout;

const Wrapper = styled.div`
  width: calc(100% - 1rem);
  height: calc(100% - 1.5rem);
  /* background-color: #7b8092; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  /* border: 2px solid black; */
  /* padding: 0.8rem 0.5rem 0rem 0.5rem; */
  padding: 0.75rem 0.5rem 0.5rem 0.5rem;
`;

const Top = styled.div`
  background-color: white;
  height: 85%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 0.625rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: teal; */
  /* height: 20%; */
  gap: 0.6rem;
  /* max-width: 69rem; */

  /* overflow-x: auto; */
  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
`;
const MappedDiv = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  max-height: 6.5rem;
  flex-grow: 1;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  /* min-width: 15rem; */
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
`;
// const Wrapper = styled.div``
// const Wrapper = styled.div``
