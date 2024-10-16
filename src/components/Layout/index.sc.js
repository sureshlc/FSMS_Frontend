import styled, { keyframes, css } from "styled-components";
import Backgroundimg1 from "../../assets/imgs/Backgroundimg1.svg";
export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  transition: all 0.4s ease-out;
  // flex-grow: 1;
  /* flex-wrap: wrap; */
  gap: 0.63rem;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;
export const TabButtons = styled.div`
  display: flex;
  gap: 0.63rem;
`;
export const TabPanel = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? "block" : "none")};
`;

export const Tabbar = styled.div`
  &.active {
    border-bottom: 0.13rem solid black;
  }
`;
export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0px 16px 16px 16px;
`;

export const TabContent = styled.div`
  width: 100%;
  height: 100%;
`;
export const TitleBlank = styled.div`
  width: 100%;
  height: 64px;
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
  position: relative;
  width: 100%;
  min-height: 84%;
  height: 100%;
  display: flex;
  /* gap: .63rem; */
  flex-direction: column;
  justify-content: center;
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
  align-items: center;
  gap: 0.63rem;
`;
export const CountryValue = styled.div``;

export const CountryData = styled.div`
  font-family: Archivo;
  font-size: 0.63rem;
  font-weight: 700;
  line-height: 0.75rem;
  letter-spacing: 0em;
  text-align: left;
  color: #7b8092;
`;

export const TabBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* padding-right: 16px;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 12.8px; */
  padding: 8px 8px 1.6px 8px;
  width: calc(100% - 32px);
  height: calc(90% - 38.4px);
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
  position: absolute;
  /* left: 64px; */
  top: 32px;
  z-index: 999;
  border-radius: 3.04px;
  background: #fff;
  box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  .dd-title {
    font-weight: 500;
  }
`;
export const Title = styled.div`
  color: #000;
  font-size: 18.08px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
  text-align: left;
  &::after {
    content: "|";
    font-family: Archivo;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.69rem;
    letter-spacing: -0.02em;
    padding-left: 0.63rem;
    color: #7b8092;
    text-align: left;
    gap: 0.63rem;
    width: 0.31rem;
    height: 1.63rem;
  }
`;
export const LogoData = styled.div``;
export const Graphboxwrapper = styled.div`
  width: 100%;
  //  height:100%;
`;
export const Detaildata = styled.div`
  font-family: Archivo;
  font-size: 0.88rem;
  font-weight: 700;
  color: #7b8092;
  line-height: 1.63rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  text-align: left;

  &::after {
    content: "|";
    font-family: Archivo;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.63rem;
    letter-spacing: -0.02em;
    text-align: left;
    padding-left: 0.63rem;
    color: #7b8092;
    width: 0.31rem;
    height: 1.63rem;
  }
`;

export const Yeardata = styled.div`
  font-family: Archivo;
  font-size: 0.88rem;
  font-weight: 700;
  color: #7b8092;
  line-height: 1.63rem;
  letter-spacing: -0.02em;
  text-align: left;
`;

export const FirstLayoutContainer = styled.div`
  position: relative;
  display: flex;
  /* padding: 1.6px 8px 1.6px 8px; */
  width: 100%;
  height: 100%;
  /* gap: 16px; */
  /* .spinner {
    border-bottom-color: #fff;
  } */
`;
export const Item = styled.div`
  font-weight: 500;
  height: 32px;
  font-size: 13.92px;
  font-family: Archivo;
`;
export const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0.94rem 0.63rem;
  gap: 1rem;
  background: #dbe9f4;
  flex-direction: column;
  /* border-radius: 8px; */
  /* border: .06rem solid #e2e2eb; */
  /* background: #fff; */
  /* box-shadow: 0rem .13rem 0rem 0rem #e2e2eb; */
  transition: all 0.4s ease-in;

  &.collapsed {
    width: 100%;
  }
`;
export const IndicatorWrapper = styled.div`
  width: calc(100% - 33.8% - 16.25rem);
  margin-left: 16.25rem;

  display: flex;
  justify-content: center;

  z-index: 100;
`;
export const IndicatorBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 14rem;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const IndicatorTitle = styled.div`
  font-family: Archivo;
  font-size: 1.06rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.02rem;

  > span {
    color: #7b8092;
    font-family: Archivo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: -0.02rem;
  }
`;

export const IndicatorContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LabelContainer = styled.div`
  position: absolute;
  padding: 0.5rem;
  background: #638EDC;
  bottom: 3rem;
  left: 1rem;
  /* height: 57.6px; */
  width: 11.25rem;
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: 4.8px;
`;

export const LabelTitle = styled.div`
  color: #141630;
  font-family: Archivo;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12.373px; /* 95.175% */
`;

export const GradientLabel = styled.div`
  width: 100%;
  height: 8px;
  display: flex;
  flex-direction: row-reverse;
  /* background: linear-gradient(
    90deg,
    #cf2f3a 0%,
    #e49256 32.81%,
    #f6c855 67.71%,
    #f5f5c7 100%
  ); */
`;

export const GradientLabelBox = styled.div`
  height: 100%;
  width: calc(100% / 6);
  background-color: ${(props) => props.background};
`;

export const LabelItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LabelItem = styled.div`
  color: #fff;
  font-family: Archivo;
  font-size: 0.563rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DataContainer = styled.div`
  /* background-color: #fff; */
  /* border-left: .31rem solid #dbe9f4; */
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.4s ease-in;
  position: absolute;
  right: 0;
  /* top: 1.6px; */
  z-index: 999;

  &.collapsed {
    right: -40%;
  }
`;

export const GraphDataContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border-radius: 0.75rem; */
  background: rgba(248, 248, 248);
  border: 0.06rem solid #d3d3d3;

  max-height: 37%;
`;

export const MapContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #dbe9f4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
export const Heading = styled.div`
  font-family: Archivo;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.19rem;
  letter-spacing: -0.02em;
  text-align: left;
`;

export const IconView = styled.div`
  cursor: pointer;
  padding: 8px 16px 8px 16px;
  &.absolute-icon {
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3.04px;
    background: #fff;
    box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
    position: absolute;
    right: 37%;
    top: 16px;
    z-index: 999;
    transition: all 0.4s ease;
  }
  &.absolute-icon.datahidden {
    right: 16px;
  }
`;
export const DataContainerSection = styled.div`
  width: 100%;
  height: calc(50% - 8px);
  /* background: #FFFFFF; */
  /* flex-shrink: 0; */
`;

export const TopDataContainerSection = styled.div`
  width: 100%;
  height: calc(60% - 8px);
`;

export const BottomDataContainerSection = styled.div`
  width: 100%;
  height: calc(40% - 8px);
`;

export const PrimaryBoxesContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const BoxWrp = styled.div`
  height: 50%;
  width: 100%;
`;
export const AccordionContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // gap: 0.5rem;
`;
export const InfoItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const InfoTitleCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.63rem;
`;
export const Placeholder = styled.div`
  width: 0.875rem;
`;
export const InfoIcon = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const InfoTitle = styled.div`
  color: #141630;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  height: 1rem;
  &.zero-change {
    margin-left: 1.2rem;
  }
`;

export const InfoValue = styled.div`
  color: #141630;
  font-size: 18.08px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 88.889% */
  text-align: left;
`;
export const InfoMiniGraphCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.5rem;

  /* padding: 1rem 0; */
`;

export const TabTitleContainer = styled.div`
  height: 1.5rem;
  width: fit-content;
`;

export const GraphWraper = styled.div`
  /* height: calc(100% - 1.5rem); */
  height: 1rem;
  max-width: 4rem;
  padding: 0rem 0.5rem 1rem 0.5rem;
`;

export const TabHeading = styled.div`
  width: 100%;
  height: 32px;
  .tabs-container {
    gap: 0.5rem;
    border-bottom: 1px solid #e6e6e6;
  }
  .tab-title-container {
    justify-content: initial;
  }
`;
export const TabBody = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
`;

export const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.63rem;
  justify-content: center;
  font-size: 1.06rem;
  font-weight: 500;
  line-height: 1.19rem;
  letter-spacing: -0.02em;
  text-align: center;
  color: #7b8092;
`;
export const MapHeaderContainer = styled.div`
  background-color: #638EDC;
  width: 100%;
  height: 2.875rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 1.35rem;
  /* padding-right: 0.8rem; */
  z-index: 100;
  .header-title,
  .country-code {
    color: #fff !important;
  }
  .country-flag-wrapper {
    svg {
      #info {
        path {
          stroke: #fff;
        }
      }
    }
  }
`;

// export const

export const NoDataview = styled.div`
position: absolute;
top: 25%;
left: 13%;
`

export const Disclamercontainer = styled.div`
 position: absolute;
 padding: 0.5rem 1.063rem;
  bottom: 0rem;
  /* left: 1rem; */
  width: 100%;
  /* right: 1rem; */
  z-index: 1;
  background:rgba(241, 242, 249, 0.7);
  span{
    color: black;
    display: inline-block;
  font-family: Archivo;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  }

`

export const Sourcecontainer = styled.div`
position: absolute;
bottom: 0.3rem;
left: 0.5rem;
span{
  font-size: 0.5rem;
  font-weight: 400;
}

`