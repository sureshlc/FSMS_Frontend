import React, { useState } from "react";
import "../assets/Boxes.css";
import Layoutmain from "./Layoutmain";

function MultipleBoxes({
  numColumns,
  boxesPerColumn,
  expandedClassName,
  reducedClassName,
  reducedConditions,
}) {
  const [expandedBox, setExpandedBox] = useState(1);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const handleClick = (boxIndex, columnIndex) => {
    setExpandedBox(boxIndex);
    setSelectedColumn(columnIndex);
  };

  const boxes = Array.from(
    { length: numColumns * boxesPerColumn },
    (_, index) => ({
      id: index + 1,
    })
  );

  const shouldApplyReducedClass = (boxId) => {
    return reducedConditions.some(
      ([expanded, box]) => expanded === expandedBox && box === boxId
    );
  };

  return (
    <div className="columns">
      {Array.from({ length: numColumns }).map((_, columnIndex) => (
        <div
          key={columnIndex}
          className={`column ${selectedColumn === columnIndex ? "large" : ""}`}
        >
          {boxes
            .slice(
              columnIndex * boxesPerColumn,
              (columnIndex + 1) * boxesPerColumn
            )
            .map((box) => (
              <div
                key={box.id}
                className={`box ${
                  expandedBox === box.id ? expandedClassName : ""
                } ${shouldApplyReducedClass(box.id) ? reducedClassName : ""}`}
                onClick={() => handleClick(box.id, columnIndex)}
              >
                <Layoutmain
                  expanded={expandedBox === box.id}
                  reduced={shouldApplyReducedClass(box.id)}
                  expand={expandedBox}
                  box={box.id}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default MultipleBoxes;
