import React from "react";
import styled from "styled-components";
import MultipleBoxes1 from "./Third/MultipleBoxes1";
// import MultipleBoxes from "./Third/MultipleBoxes";

// TODO: use rishav's bentobox here

const ThirdLayout = () => {
  return (
    <Wrapper>
      <MultipleBoxes1
        numColumns={2}
        boxesPerColumn={2}
        expandedClassName="expanded"
        reducedClassName="reduced"
        reducedConditions={[
          [2, 1],
          [1, 2],
          [4, 3],
          [3, 4],
        ]}
      />
    </Wrapper>
  );
};

export default ThirdLayout;

const Wrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  /* background: gray; */
`;
