import styled from "styled-components";

export const PopoverWrapper = styled.div`
  position: relative;
`;

export const Child = styled.div`
  display: flex;
`;

export const PopoverContainer = styled.div`
  position: absolute;
  max-width: 25rem;

  width: max-content;
  background-color: ${({ styles }) => styles?.backgroundColor || "#fff"};

  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;

  transform-origin: center top;
  transition: transform 0.1s ease, opacity 0.1s ease;
  z-index: 100;
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

  ${({ styles }) => styles} 

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    padding: 0.3rem;
    z-index: 0;

    border-left: ${({ styles }) => styles?.border};
    border-top: ${({ styles }) => styles?.border};
    background-color: ${({ styles }) => styles?.backgroundColor || "#fff"};
    ${({ arrowStyle }) => arrowStyle}

    transform: rotate(45deg);
  }
`;

export const Title = styled.p`
  color: ${({ styles }) => styles?.color || "#000"};
  margin: 0 0 0.5rem 0;
  padding: 0;
  word-wrap: break-word;

  font-size: 12.96px;
  font-weight: 500;
  line-height: 18.08px;
  color: ;
`;
export const Content = styled.div`
  color: ${({ styles }) => styles?.color || "#000"};
  margin: 0;
  padding: 1.25rem;

  font-size: 12px;
  font-weight: 400;
  line-height: 18.08px;

  word-wrap: break-word;
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0.875rem;

  top: 0.9375rem;
  z-index: 9999;

  cursor: pointer;
`;
