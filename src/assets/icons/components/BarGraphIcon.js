import React from "react";

const BarGraphIcon = ({ fill = "#7B8092" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.2 8H2V18H5.2V8Z" fill={fill} />
      <path d="M5.2 3H2V6H5.2V3Z" fill={fill} />
      <path d="M11.6023 10H8.40234V18H11.6023V10Z" fill={fill} />
      <path d="M11.6023 5H8.40234V8H11.6023V5Z" fill={fill} />
      <path d="M18.0008 7H14.8008V18H18.0008V7Z" fill={fill} />
      <path d="M18.0008 2H14.8008V5H18.0008V2Z" fill={fill} />
    </svg>
  );
};

export default BarGraphIcon;
