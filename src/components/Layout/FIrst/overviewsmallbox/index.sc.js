import styled from "styled-components";

export const BoxDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const SmallBoxContainer = styled.div`
  width: 100%;
  height: 1rem;
  color: #000;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.02rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  padding: 1.5625rem;
  background: #fff;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const PrimaryTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #252f4a;
  font-family: Archivo;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: -0.02125rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    font-family: Archivo;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

export const TitleWrapper = styled.div`
  background: transparent;
  span:nth-of-type(2) {
    font-size: 0.75rem;
    color: #767676;
    font-weight: bold;
    margin-left: 0.1rem;
  }
`;

export const TrendContainer = styled.div`
  /* width: 50%; */
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: flex-end;
  &.widthwrap {
    width: 100%;
  }
  /* justify-content: flex-start; */
`;

export const GraphDataContainer = styled.div`
  min-width: 50%;
  max-width: 50%;
  height: 100%;

  position: relative;
  bottom: -8px;

  .x.axis > .tick {
    display: none;
  }

  /* height: 100%; */
  /* display: flex; */
  /* align-items: flex-end; */
  /* justify-content: flex-end; */
  /* max-width: 3.2rem;
  max-height: 3rem; */
`;

export const Datafieldcontainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  position: relative;
`;

export const SecondaryTitleContainer = styled.div`
  font-family: Archivo;
  color: #7b8092;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
`;

export const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  gap: 0.5rem;
`;

export const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const Circle = styled.div`
  width: 0.5rem;
  min-width: 0.5rem;
  min-height: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const Label = styled.div`
  font-family: Archivo;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  white-space: nowrap;
`;
export const TrendsViewer = styled.div`
  display: flex;
`;
