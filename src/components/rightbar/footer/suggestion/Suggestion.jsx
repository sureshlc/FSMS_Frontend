import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../../hooks/Theme";
import { useGlobalData } from "../../../../hooks/GlobalContext";
import { Box, Wrapper } from "./index.sc";

export const Suggestion = ({
  placement = "top",
  onSuggestionClick,
  detailTitle,
  expanded,
  setExpanded,
  initialData,
}) => {
  // const [remainingCount, setremaininCount] = useState(initialData.length - 3);
  const [
    data,
    // setData
  ] = useState(initialData);
  // const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();

  ////////////////////////////////

  const { relatedData } = useGlobalData();

  ////////////////////////////////

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClick = (el) => {
    if (onSuggestionClick) {
      onSuggestionClick(el);
    }
    setExpanded(expanded ? !expanded : expanded);
  };

  return (
    <Wrapper ref={containerRef}>
      {relatedData?.slice(0, relatedData?.length).map((el, index) => (
        <Box
          key={index}
          onClick={() => handleClick(el)}
          theme={theme}
          className={detailTitle === el ? "selected" : ""}
        >
          {el}
        </Box>
      ))}
    </Wrapper>
  );
};

export default Suggestion;
