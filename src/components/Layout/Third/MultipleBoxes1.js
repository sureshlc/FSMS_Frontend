import React, { useState } from "react";
import Layoutmain1 from "./Layoutmain1"
import styled from 'styled-components';


function MultipleBoxes1({ numColumns, boxesPerColumn, expandedClassName, reducedClassName, reducedConditions }) {
  const [expandedBox, setExpandedBox] = useState(1);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const handleClick = (boxIndex, columnIndex) => {
    setExpandedBox(boxIndex);
    setSelectedColumn(columnIndex);
  };

  const boxes = Array.from({ length: numColumns * boxesPerColumn }, (_, index) => ({
    id: index + 1,
  }));

  const shouldApplyReducedClass = (boxId) => {
    return reducedConditions.some(([expanded, box]) => {
      return (expanded === expandedBox && box === boxId) || (box === expandedBox && expanded === boxId);
    });
  };
  
    // ... (your existing code)
  
    return (
      <Container className="columns">
        {Array.from({ length: numColumns }).map((_, columnIndex) => (
          <Column
            key={columnIndex}
            className={`${selectedColumn === columnIndex ? "large" : ""}`}
          >
            {boxes
              .slice(
                columnIndex * boxesPerColumn,
                (columnIndex + 1) * boxesPerColumn
              )
              .map((box) => (
                <Box
                  key={box.id}
                  className={`${
                    expandedBox === box.id ? expandedClassName : ""
                  } ${shouldApplyReducedClass(box.id) ? reducedClassName : ""}`}
                  onClick={() => handleClick(box.id, columnIndex)}
                >
                  <Layoutmain1
                    expanded={expandedBox === box.id}
                    reduced={shouldApplyReducedClass(box.id)}
                    expand={expandedBox}
                    box={box.id}
                  />
                </Box>
              ))}
          </Column>
        ))}
      </Container>
    );
  }
  
  export default MultipleBoxes1;



  const Container = styled.div`
  /* padding-top: 1rem; */
  display: flex;
  height: 78vh;
`;

const Column = styled.div`
  transition: all 0.3s ease-out 0s;
  flex: 1 1 0%;
  margin: 0rem 0.313rem;
  min-width: 25%;

  &.large {
    flex: 2 1 0%;
  }
`;

const Box = styled.div`
  flex: 1;
  background-color: var(--secondary-bg-color);
  transition: all 0.3s ease-out 0s;
  cursor: pointer;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 0rem 0rem 0.75rem;
  height: 49%;
  overflow: hidden;
  min-height: 18rem;
  position: relative;

  &.expanded {
    height: 83%;
    min-height: 30.32rem;
  }

  &.reduced {
    height: 15.05%;
    min-height: 5.68rem;
  }

  @media screen and (max-width: 63.125rem) {
    &.expanded {
      height: 83%;
      min-height: 30.32rem;
    }

    &.reduced {
      height: 15.05%;
      min-height: 5.68rem;
    }
  }
`;

const Scrollbar = styled.div`
  width: 0.375rem;
  height: 0.188rem;
  background-color: #F5F5F5;
`;

const ScrollbarThumb = styled.div`
  background-color: #777;
`;

  
