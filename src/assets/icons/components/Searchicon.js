import React from "react";

const Searchicon = ({ color = "white" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4998 19.8428C15.918 19.8428 19.4998 16.2611 19.4998 11.8428C19.4998 7.4245 15.918 3.84277 11.4998 3.84277C7.08148 3.84277 3.49976 7.4245 3.49976 11.8428C3.49976 16.2611 7.08148 19.8428 11.4998 19.8428Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4998 21.8432L17.1498 17.4932"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Searchicon;
