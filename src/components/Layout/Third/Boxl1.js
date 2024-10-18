import React from "react";
import styled from 'styled-components';

const MainContent = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  position: relative;
`;



const Boxl1 = ({ expand }) => {
  return (
    <MainContent className={`main-content${expand ? " expanded" : ""}`}>
    </MainContent>
  );
};

export default Boxl1;
