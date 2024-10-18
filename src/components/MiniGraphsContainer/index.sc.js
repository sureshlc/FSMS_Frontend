import styled from "styled-components";

export const TabTitleContainer = styled.div`
  height: 1.5rem;
  width: fit-content;
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

export const GraphWraper = styled.div`
  /* height: calc(100% - 1.5rem); */
  height: 1rem;
  max-width: 4rem;
  padding: 0rem 0.5rem 1rem 0.5rem;
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