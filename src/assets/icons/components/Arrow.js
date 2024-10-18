import React from "react";
import PropTypes from "prop-types";

const Arrow = ({ fill = "#000000", isOpen = false, size = "0.688rem" }) => {
  const arrowStyle = {
    transform: isOpen ? "rotateX(0deg)" : "rotateX(180deg)",
    transition: "transform 0.3s ease",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={arrowStyle}
    >
      <path
        d="M1.48262 8L5.30762 4.2919L9.13262 8L10.3076 6.8583L5.30762 2L0.30762 6.8583L1.48262 8Z"
        fill={fill}
      />
    </svg>
  );
};

export default Arrow;

Arrow.propTypes = {
  size: PropTypes.string,
  fill: PropTypes.string,
  isOpen: PropTypes.bool,
  customStyle: PropTypes.object,
};
