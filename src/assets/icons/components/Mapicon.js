import React from "react";

const Mapicon = ({fillColor,opacity}) => {
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity||"0.3"} clip-path="url(#clip0_1137_8460)">
        <path
          d="M18.4475 3.14478L18.2968 3.17303L13.267 5.12276L7.61563 3.14478L2.30332 4.93438C2.10552 5.00032 1.96423 5.16986 1.96423 5.3865V19.628C1.96423 19.8917 2.17145 20.099 2.43518 20.099L2.58589 20.0707L7.61563 18.121L13.267 20.099L18.5793 18.3094C18.7771 18.2434 18.9184 18.0739 18.9184 17.8572V3.61573C18.9184 3.35199 18.7112 3.14478 18.4475 3.14478ZM8.55753 5.47127L12.3251 6.78993V17.7725L8.55753 16.4538V5.47127ZM3.84803 6.40375L6.67373 5.45243V16.4727L3.84803 17.5653V6.40375ZM17.0346 16.84L14.2089 17.7913V6.78051L17.0346 5.6879V16.84Z"
          fill={fillColor||"#222222"}
        />
      </g>
      <defs>
        <clipPath id="clip0_1137_8460">
          <rect
            width="22.6056"
            height="22.6056"
            fill="white"
            transform="translate(0.686157 0.319092)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Mapicon;
