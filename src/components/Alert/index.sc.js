import styled from "styled-components";

export const AlertContainer = styled.div`
  height: calc(100vh - 3.7rem);
  width: 100%;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CountryCode = styled.span`
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  color: #7b8092;
`;

export const CountryDetails = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const CrossIconWrpr = styled.div`
  height: auto;
  width: 100%;
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  position: sticky;
  top: 0;
  background-color: #fff;
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  justify-content: space-between;
`;

export const CrossCont = styled.div`
  height: auto;
  width: auto;
  cursor: pointer;
`;

export const AlertHeader = styled.div`
  position: sticky;

  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #141630;

  font-family: Inter;
  font-size: 0.938rem;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.02em;
  text-align: left;
  span {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.188rem 0.31rem;
    background-color: #f72d2d;
    border-radius: 0.25rem;
    color: #fff;
    font-family: Inter;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const ContainerDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AlertCard = styled.div`
  display: flex;
  padding: 0.94rem;
  gap: 0.62rem;
  border-bottom: 1px solid #e8e8e8;
`;

export const BellWrapper = styled.div`
  height: 1.875rem;
  min-width: 1.875rem;
  width: 1.875rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ unRead }) => (!unRead ? "#F72D2D1A" : "#EBEBF0")};
`;

export const AlertContent = styled.div``;

export const Title = styled.div`
  color: var(--GREY-Dark2, #161a34);
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 106.667% */
  letter-spacing: -0.01875rem;
  cursor: pointer;
  &:hover {
    color: #009edb;
  }
`;

export const Date = styled.div`
  color: var(--Grey1, #7b8092);
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem; /* 160% */
  letter-spacing: -0.0125rem;
`;

export const Description = styled.div`
  color: #6e6e6e;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem; /* 133.333% */
  letter-spacing: -0.015rem;
  margin-top: 0.19rem;
`;

export const NoDataComponent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
`;

export const NodataText = styled.span`
  font-size: 1.125rem;
  color: #000;
  font-weight: 600;
`;

export const ExportCloseContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
