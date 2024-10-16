import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainContainer from "./MainContainer";

const SecondLayout = () => {
  return (
    <Wrapper>
      <MainContainer />
    </Wrapper>
  );
};

export default SecondLayout;
const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
`;
