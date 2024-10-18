import React from "react";
import {
  TrendCon,
  TrendDot,
  TrendIcon,
  TrendLabel,
  TrendSubLabel,
  TrendValueCon,
  TrendWrp,
} from "./index.sc";
import { TrendDirection } from "../../assets/icons";

const Trend = ({
  data = { year: "", value: "", isGreen: false, label: "" },
}) => {
  return (
    <TrendWrp>
      <TrendCon>
        <TrendLabel>{data?.year}</TrendLabel>
        <TrendSubLabel>{Math.abs(data?.value || 0)}</TrendSubLabel>
      </TrendCon>
      <TrendValueCon>
        <span>%</span>
        <TrendIcon>
          {data.value ? (
            <TrendDirection
              value={data?.value}
              color={data?.isGreen ? "#48C84E" : "#EE4242"}
            />
          ) : null}
        </TrendIcon>
      </TrendValueCon>
    </TrendWrp>
  );
};

export default Trend;
