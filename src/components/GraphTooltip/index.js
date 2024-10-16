import React from "react";
import Proptypes from "prop-types";
import {
  SlotBody,
  SlotDetailsWrp,
  SlotFooter,
  SlotHeader,
  SlotTitle,
  TooltipLabel,
  TooltipLabelContainer,
  TooltipUnit,
  TooltipValue1,
  TooltipValue2,
  TooltipValue2Container,
  TooltipValue3,
  TooltipValueContainer,
  TooltipValueWrp,
  TooltipWrapper,
} from "../slot-details/index.sc";
import {
  SpaceHolderDiv,
  TooltipBody,
  TooltipBox,
  TooltipHeader,
  TooltipSubValueCon,
  TooltipValue,
  TooltipValueWrapper,
  TooltipValueTotal,
  TotalContainer,
  TotalTooltipSubValueCon,
  Subvaluedata,
  ColorCircle,
} from "./index.sc";
import { formatNumber } from "../../utils";
import { TrendDirection } from "../../assets/icons";
import { unitMapping } from "../../constants/unitsMapping";
const getUnitDisplay = (unit) => {
  if (!unit) return;
  const lowerCaseUnit = unit.toLowerCase();
  return unitMapping[lowerCaseUnit] || unit;
};

const GraphTooltip = ({ tooltipData, widget, showTotal }) => {
  const displayedUnit = getUnitDisplay(tooltipData?.unit);
  if (tooltipData.items) {
    return (
      <TooltipWrapper>
        <TooltipLabelContainer>
          <TooltipLabel>{tooltipData?.label}</TooltipLabel>
        </TooltipLabelContainer>
        <TooltipValueContainer>
          <TooltipValue1>{tooltipData?.items[0]?.label}</TooltipValue1>
          <TooltipValue2Container>
            <TooltipValue2>
              {tooltipData?.items[0]?.value || 0}{" "}
              <span>
                {tooltipData?.unit?.toLowerCase() === "percent"
                  ? "%"
                  : displayedUnit}
              </span>
            </TooltipValue2>
          </TooltipValue2Container>
        </TooltipValueContainer>
        <TooltipValueContainer>
          <TooltipValue1>{tooltipData?.items[1]?.label}</TooltipValue1>
          <TooltipValue2Container>
            <TooltipValue2>
              {tooltipData?.items[0]?.value || 0}{" "}
              <span>
                {tooltipData?.unit?.toLowerCase() === "percent"
                  ? "%"
                  : displayedUnit}
              </span>
            </TooltipValue2>
          </TooltipValue2Container>
        </TooltipValueContainer>
      </TooltipWrapper>
    );
  } else {
    return (
      <TooltipWrapper>
        <TooltipLabelContainer>
          <TooltipLabel>{tooltipData?.label}</TooltipLabel>
        </TooltipLabelContainer>
        <TooltipValueContainer>
          <TooltipValue2Container>
            <TooltipValue2>{tooltipData?.value} </TooltipValue2>
            <TooltipUnit>
              {tooltipData?.unit?.toLowerCase() === "percent"
                ? "%"
                : displayedUnit}
            </TooltipUnit>
          </TooltipValue2Container>
        </TooltipValueContainer>
      </TooltipWrapper>
    );
  }
};

export const NewTooltip = ({ tooltipData, showTotal = true, label }) => {
  const { header = { title: "", secondaryTitle: "" }, body } = tooltipData;

  return (
    <TooltipBox>
      <TooltipHeader>
        <span>{header?.title}</span> <span>{header?.secondaryTitle}</span>
      </TooltipHeader>
      {body?.data?.length > 1 &&
        showTotal &&
        label !== "Yield" &&
        label !== "Retail domestic prices" && (
          <TotalContainer>
            <TooltipValueTotal className="data-label">Total</TooltipValueTotal>
            <TotalTooltipSubValueCon className="data-value">
              {formatNumber(
                body.data.reduce((acc, ele) => acc + (ele.subValue || 0), 0),
                2
              )}
              <span>{getUnitDisplay(body?.data[0]?.unit)}</span>
            </TotalTooltipSubValueCon>
          </TotalContainer>
        )}
      <TooltipBody>
        {body?.data?.length > 0 ? (
          body?.data?.map((ele) => {
            return (
              <TooltipValueWrapper className="data-label">
                <TooltipValue className="data-label">
                  <ColorCircle color={ele.colors}></ColorCircle>
                  {ele?.value}
                </TooltipValue>
                <TooltipSubValueCon className="data-value">
                  <Subvaluedata>
                    {" "}
                    {formatNumber(ele?.subValue ?? 0)}{" "}
                    <span>{getUnitDisplay(ele?.unit)}</span>
                  </Subvaluedata>

                  {ele?.change ? (
                    <TrendDirection
                      value={ele?.direction}
                      color={ele.isGreen ? "#48C84E" : "#EE4142"}
                      size="0.75rem"
                    />
                  ) : (
                    <SpaceHolderDiv />
                  )}
                </TooltipSubValueCon>
              </TooltipValueWrapper>
            );
          })
        ) : (
          <TooltipValueWrapper>
            <TooltipValue>
              {formatNumber(body?.value) || 0}{" "}
              <span>{getUnitDisplay(body?.unit)}</span>
            </TooltipValue>
            <TooltipSubValueCon>
              {body?.subValue || 0}%
              {body?.subValue ? (
                <TrendDirection
                  value={body?.subValue}
                  color={body.isGreen ? "#48C84E" : "#EE4142"}
                  size="0.875rem"
                />
              ) : (
                ""
              )}
            </TooltipSubValueCon>
          </TooltipValueWrapper>
        )}
      </TooltipBody>
    </TooltipBox>
  );
};

export default GraphTooltip;

GraphTooltip.propTypes = {
  type: Proptypes.string,
  tooltipData: Proptypes.object.isRequired,
  widget: Proptypes.object,
};
