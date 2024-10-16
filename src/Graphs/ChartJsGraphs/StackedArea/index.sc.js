import styled from "styled-components";

export const LineGraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const TooltipWrapper = styled.div`
  position: absolute;
  top: ${({ tooltipPos }) => tooltipPos?.top}px;
  left: ${({ tooltipPos }) => tooltipPos?.left}px;
  min-width: 6.75rem;
  height: ${({ is1dTooltip }) => (is1dTooltip ? "4.813rem" : "fit-content")};
  pointer-events: none;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
  &::after {
    visibility: ${({ isVisible, isData, hoveredIndex, lastDataIndex }) =>
      isVisible && isData ? "visible" : "hidden"};
    content: "";
    position: absolute;
    top: 100%;
    left: ${({ hoveredIndex, lastDataIndex, secondLastDataIndex, label }) =>
      hoveredIndex === 0
        ? "15%"
        : hoveredIndex === secondLastDataIndex &&
          label === "Share of agricultural land in land area by use"
        ? "64%"
        : hoveredIndex === lastDataIndex
        ? "80%"
        : "50%"};
    margin-left: -7px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;
