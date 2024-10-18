import React from "react";

const Treeicon = ({ fillColor, opacity }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 20"
      fill={fillColor || "#222222"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        opacity={opacity || "0.3"}
        d="M7.90927 7.6069V3.09863H1.52652L1.52652 7.6069L7.90927 7.6069ZM7.90926 16.7621V9.17297L1.52652 9.17297L1.52652 16.7621H7.90926ZM16.5265 13.7996V16.7615L9.11023 16.7615V13.7996L16.5265 13.7996ZM16.5265 12.2311V3.09863H9.11L9.11 12.2311L16.5265 12.2311Z"
        fill={fillColor || "#222222"}
      />
    </svg>
  );
};

export default Treeicon;
