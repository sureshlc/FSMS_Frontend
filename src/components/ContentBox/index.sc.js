import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(
    100% - ${({ headerHeight }) => (headerHeight ? headerHeight : 0)}px
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: space-between;
  align-items: normal;
  align-content: stretch;
`;

export const BoxBody = styled.div`
  width: 100%;
  height: ${({ headerHeight }) => `calc(100% - ${headerHeight}px - 0.94rem )`};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 0.94rem;

  &.wrapped {
    height: 50%;
    margin-top: 0;
  }
`;

export const YearTabsWrapper = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: ${({ isYearPresent }) =>
    isYearPresent ? "space-between" : "flex-start"};
`;

export const GraphTabsWrapper = styled.div`
  width: 3.7rem;
  height: 1.5rem;
  &.graph-tabs .tabs-container {
    justify-content: space-between;
  }

  &.graph-tabs .tab-title-container {
    padding: 0 0.13rem;
  }
`;

export const Year = styled.div`
  color: #7b8092;

  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 100%;

  padding: ${({ isChild }) =>
    isChild ? "0" : "1.88rem 1.88rem .88rem 1.88rem"};
  /* border-radius: 3px; */
  background-color: #fff;
`;

export const BoxDataContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.4s ease-in;
`;
export const TabHeading = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.06rem;
  align-self: flex-start;
  height: 36px;
  // border-bottom: 1px solid #e6e6e6;
  background-color: #f1f2f9;
  width: 100%;
  border-radius: 3px;
  padding-right: 4px;

  .tabs-container {
    gap: 0.5rem;
    border-bottom: ${({ isOverview = false }) =>
      isOverview ? "1px solid #e6e6e6" : ""};
  }
  .tab-title-container {
    justify-content: center;
  }
`;

export const TabsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-self: flex-start;
  height: 2rem;
  .tabs-container {
    gap: 28.8px;
  }
  .tab-title-container {
    justify-content: initial;
  }
  border-bottom: 1px solid #e6e6e6;
`;

export const TabBody = styled.div`
  width: 100%;

  height: calc(100% - 2.25rem - 1.06rem);
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
export const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
export const InfoItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const InfoTitleCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9.6px;
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

export const SlotDetailsWrp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const SlotBody = styled.div`
  width: 100%;
  height: ${({ legend, header }) =>
    !header ? "calc(100% - 20%)" : legend ? "calc(100% - 33%)" : "100%"};
`;
export const SlotFooter = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  .legend-wrp {
    justify-content: center;
  }
`;

export const AccordionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  justify-content: center;
`;
export const LatestTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LatestYearContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  span {
    font-family: Inter;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.063rem;
    letter-spacing: 0em;
    text-align: left;
    color: #7b8092;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const AccordionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  min-width: 5.75rem;
`;

export const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 0.875rem;
  letter-spacing: 0em;
  text-align: left;
  text-transform: capitalize;
  div {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  gap: 0.313rem;
`;

// export const  InfoValue = styled.div`
// `;

export const AcordionData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const InfoValues = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.1rem;
  div {
    color: #141630;
    font-family: Inter;
    font-size: 2vh;
    font-weight: 500;

    line-height: 2.2vh;
    letter-spacing: 0em;
    text-align: left;
  }
  span {
   
   font-family: Inter;
font-size: 1.5vh;
font-weight: 300;
line-height: 1.85vh
letter-spacing: 0em;
text-align: left;

    svg {
      margin-bottom: -0.03rem;
    }
  }
`;

export const TrendValue = styled.div`
  height: 0.1rem;
`;

export const ToTalValue = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;

  // & > div:first-child {
  //   font-family: Inter;
  // font-size: 1.5vh;
  // font-weight: 300;
  // line-height: 1.85vh
  // letter-spacing: 0em;
  // text-align: left;
  // }

  .value {
    font-family: Inter;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
