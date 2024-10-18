import React from "react";
import styled from "styled-components";
import Maincontainer from "./MainContainer";

const FirstLayout = () => {
  return (
    <Wrapper>
      <Maincontainer />
    </Wrapper>
  );
};

export default FirstLayout;

const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  .gridLayout {
    padding-top: 0;
    .three {
      border-top: 2px solid #eff4f7;
    }
  }
`;
