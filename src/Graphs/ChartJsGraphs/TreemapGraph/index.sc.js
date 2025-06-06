import styled from "styled-components";

export const TreeMapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const TooltipWrapper = styled.div`
  position: absolute;
  top: ${({ tooltipPos }) => tooltipPos?.top}px;
  left: ${({ tooltipPos }) => tooltipPos?.left}px;
  min-width: 6.75rem;
  height: 4.813rem;
  min-height: 4.813rem;
  /* min-height: 5.2rem;
  max-height: 7rem; */
  pointer-events: none;
  z-index: 20;
  transition: all 0.3s ease-in-out;
  &::after {
    visibility: ${({ isVisible, isData }) =>
    isVisible && isData ? "visible" : "hidden"};
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -7px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;
