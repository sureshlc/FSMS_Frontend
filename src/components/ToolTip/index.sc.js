import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
`;

export const Child = styled.div`
  display: flex;
`;

export const TooltipContainer = styled.div`
  position: fixed;
  //   width: 10.625rem;
  /* height: 7.125rem; */
  background-color: ${({ variant }) => (variant === "dark" ? "#000" : "#fff")};
  background-clip: padding-box;
  border-radius: 0.1875rem;
  box-shadow: 0 0.38rem 1rem 0 rgba(0, 0, 0, 0.08),
    0 0.19rem 0.38rem -0.25rem rgba(0, 0, 0, 0.12),
    0 0.56rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
  padding: 0.9375rem;
  z-index: ${({ zIndex }) => zIndex || 1000};
  transform-origin: center top;
  transition: transform 0.1s ease, opacity 0.1s ease;
  display: flex;
  padding: 0.938rem;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 5px 10px 0px #00000040;
  ${({ isOpen }) =>
    isOpen
      ? `  
  transform: scale(1);
    opacity: 1;
       
      `
      : `
      
        transform: scale(0);
    opacity: 0;
     
      `}

  ${({ toolTipStyle }) => toolTipStyle}
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    padding: 0.31rem;

    z-index: -1;

    background-color: ${({ variant }) =>
      variant === "dark" ? "#000" : "#fff"};
    ${({ arrowStyle }) => arrowStyle}

    transform: rotate(45deg);
  }
`;

export const Content = styled.div`
  color: ${({ variant }) => (variant === "dark" ? "#fff" : "#000")};
  margin: 0;
  padding: 0;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.0625rem;
  text-align: left;
  word-wrap: break-word;
`;
