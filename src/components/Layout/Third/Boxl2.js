import React from "react";
import styled from 'styled-components';

const MainContent2 = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const TopContent2 = styled.div`
  text-align: center;
  padding-top: 1.875rem;
  vertical-align: middle;
  color: #777;
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
`;

const SvgIcon = styled.svg`
  color: #777;
`;

const BottomContent2 = styled.div`
  display: flex;
  margin-top: 1.625rem;
  top: auto;
`;


const Boxl2 = ({ expand, box }) => {
  const shouldRenderContent = expand === box;
  return (
    <MainContent2 className={`main-content-2${shouldRenderContent ? " expanded" : ""}`}>
      <TopContent2 className="top-content-2">

      </TopContent2>
      {shouldRenderContent ? (
        <BottomContent2 className="bottom-content-2">
        </BottomContent2>
      ) : null}
    </MainContent2>
  );
};

export default Boxl2;
