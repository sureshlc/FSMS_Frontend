import React from "react";

const AccordionArrow = ({ fill = "#141630", isOpen = false }) => {
  const arrowStyle = {
    transform: isOpen ? "rotate(90deg)" : "",
    transition: "transform 0.4s ease",
  };
  return (
    <svg width="10" height="5" viewBox="0 0 10 17" fill="none" style={arrowStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.5L8.5 8.5L1.5 15.5" stroke={"#7B8092"} strokeWidth="2" />
    </svg>
  );
};

export default AccordionArrow;