import styled from "styled-components";

export const LineGraph = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  span {
    font-size: 1rem;
    font-weight: 400;
  }
`;
export const TooltipWrapper = styled.div`
  visibility: ${({ isVisible, isData }) =>
    isVisible && isData ? "visible" : "hidden"};
  position: absolute;
  top: ${({ tooltipPos }) => tooltipPos?.top - 4}px;
  left: ${({ tooltipPos }) => tooltipPos?.left}px;
  min-width: 9.56rem;
  height: 4.813rem;
  pointer-events: none;
  min-height: 4.813rem;
  z-index: 20;
  transition: all 0.3s ease-in-out;
  &::after {
    visibility: ${({ isVisible, isData, hoveredIndex, lastDataIndex }) =>
      isVisible && isData ? "visible" : "hidden"};
    content: "";
    position: absolute;
    top: 100%;
    left: ${({ hoveredIndex, lastDataIndex }) =>
      hoveredIndex === 0
        ? "15%"
        : hoveredIndex === lastDataIndex
        ? "75%"
        : "50%"};
    margin-left: -7px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;
