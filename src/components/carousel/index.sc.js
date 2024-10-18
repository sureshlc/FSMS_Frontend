import styled, { css } from 'styled-components';

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  // box-shadow: 0rem .25rem .25rem rgba(0, 0, 0, 0.05);
  gap: ${(props) => props.gap || '0.5rem'}; /* Default value is 0.5rem */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const CarouselBox = styled.div`
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  gap: 0.625rem;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  min-height: fit-content;
`;

export const CarouselDotbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem;
  gap: 0.1875rem;

  ${({ absoluteDots }) =>
    css(absoluteDots ? { position: 'absolute', width: '100%', bottom: 0 } : {})}
`;

export const Dots = styled.span`
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  aspect-ratio: 1/1;
`;

export const SlideWrapper = styled.div`
  min-width: 100%;
  height: 100%;
`;
