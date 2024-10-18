import React from "react";

const NoChangeArrow = () => {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M1 8L4 11M4 11L7 8M4 11L4 1"
        stroke="#BABED9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.4"
        d="M7 4L4 1M4 1L1 4M4 1V11"
        stroke="#BABED9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 1V11"
        stroke="#BABED9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NoChangeArrow;
