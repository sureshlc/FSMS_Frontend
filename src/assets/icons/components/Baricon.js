import React from "react";

const Baricon = ({fillColor,opacity}) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g  opacity={opacity||"0.3"} clip-path="url(#clip0_1137_8463)">
        <path
          d="M3.29163 8.98454H6.11732V18.2152H3.29163V8.98454ZM8.56626 5.02856H11.2036V18.2152H8.56626V5.02856ZM13.8409 12.5638H16.4782V18.2152H13.8409V12.5638Z"
          fill={fillColor||"#222222"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1137_8463">
          <rect
            width="22.6056"
            height="22.6056"
            fill="white"
            transform="translate(0.129761 0.319092)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Baricon;
