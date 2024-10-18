import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .rsm-svg {
    width: 100%;
    height: 100%;
    background-color: #638edc;
  }
`;

export const MapTooltipWrp = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  min-width: 5rem;
  /* max-width: 8rem; */
  height: fit-content;
  align-items: flex-start;
  border-radius: 0.25rem;
  opacity: 0.95;
  background-color: #141630;
`;
export const MapTooltipValueCon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  span {
    color: #fff;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.375rem; /* 157.143% */
    letter-spacing: -0.0175rem;
  }
`;
