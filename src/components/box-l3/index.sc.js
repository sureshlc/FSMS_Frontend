import styled from "styled-components";

export const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  /* padding: 2.5rem 2.5rem 1.5rem 2.5rem; */
  background: #fff;
`;
export const BoxTitleContainer = styled.div`
  width: 100%;

  min-height: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: flex-start;
`;
export const BoxBody = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  &.h-reduce {
    height: calc(100% - 3.5rem);
  }
  .tick {
    color: #7b8092;
    font-family: Archivo;
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.02em;
    text-align: left;
  }
  .line-circle-grp {
    width: 4px;
    height: 4px;
    border: 1px;
    background: white;
  }
  .line-bg-rect-group {
    color: white;
    background: white;
  }
`;
export const FlexColDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LegendBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  align-items: center;
  gap: 0.5rem;
  /* margin-left: 1rem; */
`;

export const LegendItems = styled.div`
  display: #7b8092;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const LegendItemValue = styled.div``;

export const LegendColor = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${(props) => props.color};
`;

export const SublabelItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export const Title = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: normal;
  align-content: stretch;
  gap: 0.2rem;
`;

export const PrimaryTitle = styled.div`
  color: #141630;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 94.118% */
  letter-spacing: -0.02125rem;
  > span {
    color: #7b8092;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: -0.02125rem;
    margin-left: 0.3rem;
  }
  &.active {
    color: #009edb;
  }
`;

export const SecondaryTitle = styled.div`
  color: #7b8092;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.02125rem;
`;

export const Sublabel = styled.div`
  color: #626262;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem; /* 107.692% */
`;

export const InfoSectionWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  /* position: absolute; */
  top: calc(50% - 4.5rem / 2.5);
`;

export const InfoSection = styled.div`
  width: 30%;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const InfoTitle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.2rem;
  color: #7b8092;
  font-family: Archivo;
  font-size: 0.81rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;

  span {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
`;

export const Numbers = styled.div`
  color: #141630;

  font-family: Archivo;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.4px;

  span {
    color: #7b8092;
    font-family: Archivo;
    font-size: 14.08px;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
  }
`;
export const TrendsViewer = styled.div``;
