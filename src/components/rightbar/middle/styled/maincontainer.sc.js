import styled, { keyframes, css } from "styled-components";
import Backgroundimg1 from "../../../../assets/imgs/Backgroundimg1.svg";
export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  transition: all 0.4s ease-out;
  // flex-grow: 1;
  /* flex-wrap: wrap; */
  gap: 10px;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;
export const TabButtons = styled.div`
  display: flex;
  gap: 10px;
`;
export const TabPanel = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
`;

export const Tabbar = styled.div`
  &.active {
    border-bottom: 2px solid black;
  }
`;
export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const TabContent = styled.div`
  width: 100%;
  height: 100%;
`;
export const TitleBlank = styled.div`
  width: 100%;
  height: 4rem;
  background: #f3f7fc;
`;

export const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 84%;
  height: 100%;
  display: flex;
  /* gap: 10px; */
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.4s ease-out;
  &.active {
    animation: ${(props) =>
      props.animationDirection === "right"
        ? css`
            ${slideInFromRight} 0.5s ease-in-out
          `
        : props.animationDirection === "left"
        ? css`
            ${slideInFromLeft} 0.5s ease-in-out
          `
        : "none"};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export const HeadingData = styled.div`
  display: flex;
  gap: 10px;
`;
export const CountryValue = styled.div``;

export const CountryData = styled.div`
  font-family: Archivo;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #7b8092;
`;

export const TabBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.8rem; */
  padding: 0.5rem 0.5rem 0.1rem 0.5rem;
  width: calc(100% - 2rem);
  height: calc(90% - 2.4rem);
  background-image: url(${Backgroundimg1});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  /* z-index: 1; */
  /* opacity: 0.6; */

  /* Creating a pseudo-element for the background image with opacity */
  /* &::before {
    content: "";
    background-image: url(${Backgroundimg1});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  } */
`;

export const TitleContainer = styled.div`
  width: 100%;
  gap: 10px;
  align-items: center;
  max-height: 2.5rem;
  display: flex;
`;
export const Title = styled.div`
  font-family: Archivo;
  font-size: 22px;
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.02em;
  text-align: left;
  &::after {
    content: "|";
    font-family: Archivo;
    font-size: 12px;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: -0.02em;
    padding-left: 10px;
    color: #7b8092;
    text-align: left;
    gap: 10px;
    width: 5px;
    height: 26px;
  }
`;
export const LogoData = styled.div``;
export const Graphboxwrapper = styled.div`
  width: 100%;
  //  height:100%;
`;
export const Detaildata = styled.div`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 700;
  color: #7b8092;
  line-height: 26px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  text-align: left;

  &::after {
    content: "|";
    font-family: Archivo;
    font-size: 12px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: -0.02em;
    text-align: left;
    padding-left: 10px;
    color: #7b8092;
    width: 5px;
    height: 26px;
  }
`;

export const Yeardata = styled.div`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 700;
  color: #7b8092;
  line-height: 26px;
  letter-spacing: -0.02em;
  text-align: left;
`;
