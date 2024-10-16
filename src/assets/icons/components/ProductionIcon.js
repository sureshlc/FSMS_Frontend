import React from "react";

const ProductionIcon = ({ color = "#505050" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1128 5L9.00174 1L1.89062 5M16.1128 5V13L9.00174 17M16.1128 5L9.00174 9M9.00174 17L1.89062 13V5M9.00174 17V9M1.89062 5L9.00174 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProductionIcon;
