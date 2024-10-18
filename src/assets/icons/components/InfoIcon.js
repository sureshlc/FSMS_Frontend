import React from "react";

const InfoIcon = ({ size = "16", fill = "#7B8092" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="info" clip-path="url(#clip0_5251_13794)">
        <path
          id="Vector"
          d="M7.9987 14.6667C11.6806 14.6667 14.6654 11.6819 14.6654 8.00004C14.6654 4.31814 11.6806 1.33337 7.9987 1.33337C4.3168 1.33337 1.33203 4.31814 1.33203 8.00004C1.33203 11.6819 4.3168 14.6667 7.9987 14.6667Z"
          stroke={fill}
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M8 10.6667V8"
          stroke={fill}
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_3"
          d="M8 5.33337H8.0075"
          stroke={fill}
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5251_13794">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
