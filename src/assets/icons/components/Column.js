import React from "react";

const Column = ({ color = "#7B8092" }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 3.54614H3.44802V13.9349H0V3.54614Z" fill={color} />
      <path d="M5.17188 7.09155H8.6199V13.9349H5.17188V7.09155Z" fill={color} />
      <path
        d="M10.3438 -0.000244141H13.7918V13.9346H10.3438V-0.000244141Z"
        fill={color}
      />
    </svg>
  );
};

export default Column;
