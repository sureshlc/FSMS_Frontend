import React from "react";
import { Wrapper, GraphWrapper } from "./index.sc";
import Trend from "../trend";
import DynamicBarGraph from "../../Graphs/ChartJsGraphs/BarGraph";
import useQueryParams from "../../hooks/useQueryParams";
// import { smallBarGraphConfigs } from "../../Graphs/ChartJsGraphs/BarGraph/helper";

const GraphTrendCombo = ({ data }) => {
  const { getAllQueryParams } = useQueryParams();
  const { countryId } = getAllQueryParams();
  return (
    <Wrapper>
      {!data.hideGraph && (
        <GraphWrapper>
          <DynamicBarGraph
            data={data}
            barPercentage={0.7}
            arrowIndicatorPosition={15}
            // config={smallBarGraphConfigs}
            isTrend={true}
            fixedTooltip={false}
            selectedCountryName={countryId}
            barThickness={3}
            padding={5}
          />
        </GraphWrapper>
      )}

      <Trend
        data={{
          year: data.latestYear,
          value: data?.data?.find((item) => item.year === data.latestYear)
            ?.value,
          isGreen: data.isGreen,
        }}
      />
    </Wrapper>
  );
};

export default GraphTrendCombo;
