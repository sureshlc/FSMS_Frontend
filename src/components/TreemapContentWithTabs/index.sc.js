import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.31rem;
`;

export const GraphWrapper = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
`;

export const TabsWrapper = styled.div`
  width: 90%;
  height: 1rem;

  &.tree-map-tabs .tabs-container {
    justify-content: space-between;
  }
  &.tree-map-tabs .tab-title-container {
    flex: 0;
    padding: 0 0.5rem;
  }
  &.tree-map-tabs .tab-title-container div {
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 0.5rem;
    font-style: normal;
    line-height: normal;
  }
`;
