import styled, { keyframes, css } from 'styled-components/macro'

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ width }) => width || '100%'};
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 1001;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  ${({ isOpen }) =>
    !isOpen &&
    css`
      animation: ${fadeOut} 0.3s ease-in-out;
    `}
`

export const ConfirmationContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: ${({ popupPosition = { top: '50%' } }) => popupPosition?.top || '50%'};
  left: ${({ popupPosition = { left: '50%' } }) => popupPosition.left || '50%'};
  ${({ popupPosition = { top: '50%', left: '50%' } }) =>
    popupPosition.top === '50%' &&
    popupPosition.left === '50%' &&
    `transform:translate(-50%,-50%);`}
  width: ${({ width }) => width || '641px'};
  max-width: 641px; /* Added max-width */
  height: auto; /* Changed height to auto */
  background-color: #fff;
  padding: 38px 87px;
  border-radius: 0.25rem;
  filter: drop-shadow(0px 0.25rem 0.625rem rgba(0, 0, 0, 0.1));
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  ${({ isOpen }) =>
    !isOpen &&
    css`
      animation: ${fadeOut} 0.3s ease-in-out;
    `}
`

export const ConfirmationHeader = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const ConfirmationTitle = styled.h3`
  margin: 0;
  width: 100%;
`
export const MainContentContainer = styled.div`
  width: 100%;
  overflow: auto;
  flex: 1;
  margin-bottom: 1rem;
`

export const ConfirmationContent = styled.div`
  width: 100%;
  overflow: auto;
  flex: 1;
  margin-bottom: 1rem;
`

export const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`

const ConfirmationHeaderText = styled.div`
  /* Add styles for the header text */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #3d5f73;
`
