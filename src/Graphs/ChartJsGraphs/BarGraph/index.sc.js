import styled from "styled-components";

export const BarGraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const TooltipWrapper = styled.div`
  visibility: ${({ isVisible, isData }) =>
    isVisible && isData ? "visible" : "hidden"};
  position: absolute;
  top: ${({ tooltipPos }) => tooltipPos?.top - 2}px;
  left: ${({ tooltipPos }) => tooltipPos?.left}px;
  min-width: 8rem;
  width: fit-content;
  height: 4.813rem;
  min-height: 4.813rem;
  max-height: 5rem;
  pointer-events: none;
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
      ? "14%"
      : hoveredIndex === lastDataIndex
        ? "76.5%"
        : "50%"};
    margin-left: -7px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;
