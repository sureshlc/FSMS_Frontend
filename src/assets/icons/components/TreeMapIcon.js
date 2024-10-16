import React from "react";

const TreeMapIcon = ({ fill = "#7B8092" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.589844 2V18H19.4134V2H0.589844ZM2.80438 15.5385V4.46154H6.12618V15.5385H2.80438ZM8.34071 15.5385V11.2308H11.6625V15.5385H8.34071ZM17.1988 15.5385H13.877V11.2308H17.1988V15.5385ZM8.34071 8.76923V4.46154H17.1988V8.76923H8.34071Z"
        fill={fill}
      />
    </svg>
  );
};

export default TreeMapIcon;
