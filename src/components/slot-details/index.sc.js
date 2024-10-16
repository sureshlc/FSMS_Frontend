import styled from "styled-components";

export const SlotDetailsWrp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const SlotHeader = styled.div`
  width: 100%;
  height: ${({ isSubLabel }) => (isSubLabel ? "3.5rem" : "3rem")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const SlotWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
  // border: 1px solid red;
  top: ${({ component, is3YearAverage }) =>
    component === "column_overview"
      ? is3YearAverage
        ? "30%"
        : "40%"
      : is3YearAverage
      ? "35%"
      : "45%"};
`;
export const SlotTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const SlotTitle = styled.div`
  color: #000;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  > span {
    font-weight: 400;
  }
`;

export const MetricsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 0.3rem;
`;

export const LatestYear = styled.div`
  color: #73777f;
  font-family: Inter;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ChangeIndex = styled.div`
  color: ${({ isGreen }) => (isGreen ? "#0ACF97" : "#FF787C")};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SlotSubTitle = styled.div`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  color: #7b8092;
`;

export const SlotUnit = styled.div`
  display: inline-block;
  color: #73777f;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 0.2rem;
`;
export const SlotBody = styled.div`
  width: 100%;
  height: calc(
    100% -
      ${({ header, sublabel }) =>
        header ? (sublabel ? "3.5rem" : "3rem") : "1rem"}
  );
`;
export const SlotFooter = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  .legend-wrp {
    justify-content: center;
  }
`;

export const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
`;
//tooltip
export const TooltipWrapper = styled.div`
  min-width: 4.5rem;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: space-between;
  padding: 0.6rem 0.6rem;
  border-radius: 0.1rem;
  background: #000;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const TooltipLabelContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TooltipLabel = styled.div`
  color: var(--Grey1, #7b8092);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.015rem;
`;
export const TooltipValueContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;
export const TooltipValue1 = styled.div`
  color: #f1f1f1;
  font-size: 0.75rem;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.0125rem;
  font-weight: 400;
  white-space: nowrap;
`;

export const TooltipValue2Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

export const TooltipValue2 = styled.div`
  color: #f1f1f1;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.0125rem;
  span {
    color: #f1f1f1;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: -0.0125rem;
  }
`;

export const TooltipUnit = styled.div`
  color: #f1f1f1;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: -0.0125rem;
`;

export const TooltipValue3 = styled.div`
  color: #f1f1f1;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: -0.0125rem;
`;
export const TooltipValueWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;
