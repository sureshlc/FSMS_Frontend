import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  padding-bottom: 0.38rem;
`;

export const GraphWrapper = styled.div`
  width: 45%;
  height: 8vh;
  @media (max-height: 815px) {
    height: 3rem;
  }
`;
