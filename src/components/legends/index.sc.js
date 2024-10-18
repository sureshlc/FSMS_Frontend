import styled from "styled-components";

export const LegendWrp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const LegendCon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
export const LegendColor = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
`;
export const LegendLabel = styled.div`
  color: #000;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;
