import React from "react";
import { BoldText, ContWrpr, MainWrpr, NormalText } from "./index.sc";
import NoDataIcon from "../../assets/icons/components/NoDataIcon";

export default function NoDataComp({
  graphType,
  smallbox,
  primaryText,
  secondaryText,
}) {
  return (
    <MainWrpr>
      {/* <img src={graphType} alt="" srcset="" /> */}
      <ContWrpr className={smallbox === true ? "small" : ""}>
        <NoDataIcon size={smallbox ? 15 : 50} />
        <BoldText className={smallbox === true ? "small" : ""}>No Data Available</BoldText>
        <NormalText className={smallbox === true ? "small" : ""}>This information is not available </NormalText>
      </ContWrpr>
    </MainWrpr>
  );
}
