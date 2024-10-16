import React from "react";
import Loader from "../loader/Loader";
import { countryIsoMapping } from "../../constants/countryIsoMapping";
import { Wrapper } from "./index.sc";
import NoDataComp from "../NoDataComp";
import { transformDataArr } from "./utils";

const Content = ({
  Graph,
  data,
  isLoading,
  headerHeight,
  graphType,
  smallbox,
  showTotalInTooltip,
  handleOnClick,
}) => {
  const GraphComponent = Array.isArray(Graph) ? Graph[0] : Graph;

  return (
    <Wrapper
      headerHeight={headerHeight}
      onClick={() => handleOnClick && handleOnClick()}
    >
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "1rem",

            backgroundColor: "#F9FAFF",
          }}
        >
          <Loader
            type="spinnerWithLogo"
            height={"32"}
            width={"32"}
            spinnerWidth={3}
          />
        </div>
      ) : !data?.data || data?.data?.length === 0 ? (
        <NoDataComp graphType={graphType} smallbox={smallbox} />
      ) : (
        <GraphComponent
          data={{ ...data, data: transformDataArr(data?.data, data.xAxisKey) }}
          selectedCountryName={countryIsoMapping[data?.area]}
          showTotalInTooltip={showTotalInTooltip}
        />
      )}
    </Wrapper>
  );
};

export default Content;
