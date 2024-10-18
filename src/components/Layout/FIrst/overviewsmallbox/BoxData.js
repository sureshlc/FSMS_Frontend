// BoxData.js
import React from "react";
import PropTypes from "prop-types";
import { BoxDataContainer } from "./index.sc";
import BoxDataitem from "./BoxDataitem";

const BoxData = ({ numberOfBoxes, data }) => {
  // Ensure data is an array with at least numberOfBoxes elements
  const boxesData = Array.from(
    { length: numberOfBoxes },
    (_, index) => data?.[index] || {}
  );


  return (
    <BoxDataContainer>
      {boxesData.map((boxData, index) => (
        <BoxDataitem
          key={index}
          title={boxData?.title}
          subtitle={boxData?.subtitle}
          alert={boxData?.alert}
          content={boxData?.content}
          trends={boxData?.trends}
          graph={boxData?.graph}
        />
      ))}
    </BoxDataContainer>
  );
};

BoxData.propTypes = {
  numberOfBoxes: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BoxData;
