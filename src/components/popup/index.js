import React from "react";
import reactDom from "react-dom";
import styled from "styled-components";

const PortalPopup = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return reactDom.createPortal(
    <Container
      zIndex={props.zIndex}
      className={props.isOpen ? "open" : "closed"}
    >
      {props.children}
    </Container>,
    document.getElementById("popup")
  );
};

export default PortalPopup;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: ${(props) => (props.isOpen ? "0" : "-100%")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : 100)};
  overflow: auto;
  &&::-webkit-scrollbar {
    display: none;
  }

  transition: bottom 0.3s ease-in-out; // Apply transition to the 'bottom' property

  &.open {
    bottom: 0;
  }
`;

export const PortalBackdrop = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  background: #7b8092;
`;
