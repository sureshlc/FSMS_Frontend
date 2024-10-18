import styled from "styled-components";

export const Mainwrapper = styled.div`
  width: 100%;
  display: flex;
  // gap: 1.5rem;
  align-items: center;
  height: 3.5rem;
  /* z-index: 1; */
  /* border: 1px solid #e2e2eb; */
  //  padding-right:4.5rem;
  //  margin-left:4rem;
  /* gap:2.5px; */
  /* background: #ffffff; */
  // padding-right: 1rem;
  /* padding-left: 1.8rem; */
  /* margin-right: 4rem; */
  /* justify-content: space-between; */
  vertical-align: center;
  transition: all 0.4s ease-out;
  &.collapsed {
    // width: 97%;
    margin-left: 0.7rem;
    transition: all 0.4s ease-out;
  }
`;

export const LogoContainer = styled.div`
  grid-column: 4/6;
  justify-self: end;
  display: flex;
  justify-content: space-between;
  gap: 2.75rem;
  margin-left: auto;
  padding-right: 1rem;
`;

export const Wrapper = styled.div`
  // display: flex;
  // border: 1px solid black;
  // gap: 1rem;
  // flex-wrap: wrap;
  // width: 55.5%;
  // align-items: center;
  grid-column: 1/4;
  height: 100%;
  // margin-top:0.8rem;
  // margin-left:1rem;
  // padding-left:2.5rem;
  /* width: 100%; */
`;

export const Filter = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const FilterTitle = styled.div`
  font-family: Archivo;
  width: fit-content;
  font-size: 10px;
  color: #7b8092;
  font-weight: 500;
  line-height: 12px;
  padding-left: 0.7rem;
  letter-spacing: 1px;
  text-align: left;
`;

export const Item = styled.div`
  min-width: 2.5rem;
  color: #2f3446;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.44rem;
  font-family: Archivo;
  font-size: 0.873rem;
  font-weight: 500;
  line-height: 12px;
  // margin-left: 0.63rem;
  white-space: nowrap;
  justify-content: start;
  cursor: pointer;
  ${({ active = false, color }) =>
    active
      ? `
  color: ${color};
  `
      : `
  color: #000;
  `};

  &:first-child {
    margin-top: 5px;
  }
`;

export const TimeStampContainer = styled.div`
  //   min-width: 13.5rem;
  /* position: absolute; */
  /* right: 2rem; */
  gap: 0.5rem;
  align-items: center;
  display: flex;
`;
export const Left = styled.div`
  //   flex: 8.5;
  display: flex;
  flex-direction: column;
  color: rgba(20, 22, 48, 0.7);
  text-align: right;
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.9375rem;
`;

export const LogoutContainer = styled.div`
  cursor: pointer;
  position: relative;
  height: 1.88rem;
  &:hover::after {
    content: "Logout"; /* Tooltip text */
    position: absolute;
    background-color: black;
    color: white;
    font-size: 0.875rem;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 10000;
    top: 30px; /* Position the tooltip above the button */
    left: 35%; /* Position the tooltip horizontally centered */
    transform: translateX(-50%); /* Adjust horizontal positioning */
    opacity: 0.8; /* Adjust tooltip opacity */
    transition: opacity 0.3s; /* Add transition for smoother appearance */
  }
`;
export const Right = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.69rem;
`;
export const LeftTop = styled.div`
  height: 50%;
  display: flex;
  /* color: #242639;
  opacity: 0.5;
  font-weight: 500 !important; */
  justify-content: flex-end;
  // //   margin-right: 5%;
  //   color: #5a617b;
`;
export const LeftBottom = styled.div`
  height: 50%;
  /* opacity: 0.5;
  color: #242639;
  font-weight: 500 !important; */
`;
export const HeadingContainer = styled.div`
  height: 100%;
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  width: 100%;
  
  align-items: center;
  margin: 0rem 1rem 1rem 1rem; */
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 2px;
  /* border-left:2px solid #EFF4F7; */
  width: calc(100% - 1px);
  height: 100%;
`;
export const HeadingData = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  height: 100%;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  align-items: center;
  // max-height: 2.5rem;
  display: flex;
  justify-content: space-between;
  background-color: #eff4f7;
`;
export const Title = styled.div`
  color: #141630;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.02125rem;
  text-align: left;
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;
export const CountryRank = styled.div`
  /* width: 1.4rem;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #009edb; 
  border-radius: 50%;*/
  color: #73777f;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.01875rem;
`;

export const CustomComponent = styled.div`
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.375rem;
  align-items: center;
  span {
    font-weight: 500;
    font-size: 0.8rem;
    font-family: Archivo;
    line-height: 17px;
    letter-spacing: -0.02em;
    text-align: left;
    color: gray;
    &.year {
      color: #141630;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1rem; /* 100% */
    }
  }
`;

export const NotificationWrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 2rem;
`;

export const NotificationDot = styled.div`
  position: absolute;
  top: 0px;
  right: 1px;
  width: 0.6rem;
  height: 0.6rem;

  border-radius: 50%;
  background-color: #f72d2d;
  border: 2px solid #fff;
`;
