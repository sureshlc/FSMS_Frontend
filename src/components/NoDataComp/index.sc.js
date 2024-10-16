import styled from "styled-components";

export const MainWrpr = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ContWrpr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  justify-content: center;
  gap: 0.25rem;
  &.small {
    gap: 0.1rem;
  }
`;

export const BoldText = styled.h1`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  background: white;
  &.small {
    font-size: 0.7rem;
  }
`;

export const NormalText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #8e95b3;
  background: white;
  &.small {
    font-size: 0.5rem;
  }
`;
