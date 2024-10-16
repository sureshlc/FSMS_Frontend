import React from "react";
import { LegendColor, LegendCon, LegendLabel, LegendWrp } from "./index.sc";

const Legend = ({ legendData = [] }) => {
  return (
    <LegendWrp className="legend-wrp">
      {legendData != ""
        ? legendData?.map((legend, i) => {
            return (
              <LegendCon key={i}>
                <LegendColor bgColor={legend.color}></LegendColor>
                <LegendLabel>{legend.label}</LegendLabel>
              </LegendCon>
            );
          })
        : ""}
    </LegendWrp>
  );
};

export default Legend;
