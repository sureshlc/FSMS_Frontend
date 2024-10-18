import styled from "styled-components";
export const TooltipWrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  border-radius: 4px;
  border: 1px;
  gap: 7px;
  /* max-width: 5rem; */
`;

export const TooltipTopSection = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 0.3rem;
  /* gap: 10px; */
  /* align-items: baseline; */
  /* justify-content: start; */
  /* align-items: center; */
`;

export const LegendColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToolTipText = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TooltipTitle = styled.div`
  font-family: Archivo;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #7b8092;
`;
export const TooltipUnit = styled.div`
  color: #737373;
  font-family: Archivo;
  font-size: 9.789px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const ToolTipValue = styled.div`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #252f4a;
`;

export const ToolTipUnit = styled.div`
  font-family: Archivo;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #252f4a;
`;

export const Colorbox = styled.div`
  background: ${(props) => props.color || "blue"};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.18rem;
`;
export const Valuebox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* align-items: center; */
`;

// new
export const TooltipBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.25rem;
  background-color: #fff;
  box-shadow: 0px 4px 20px 0px #00000033;

  // border-radius: 0.25rem;
  color: #000;
  padding: 1.25rem;
`;
export const TooltipHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  span {
    color: #7b8092;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.2rem;
`;
export const TooltipValueWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;

  &.data-label {
    gap: 1.2rem;
  }
`;
export const TooltipValue = styled.div`
  color: #141630;
  font-size: 1rem;
  font-style: normal;
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.0175rem;
  white-space: nowrap;
  span {
    font-size: 1rem;
    font-weight: 700;
    text-align: end;
  }
  &.data-label {
    color: #141630;
    font-family: Inter;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 0.75rem;
    letter-spacing: 0em;
    text-align: left;
  }
`;
export const TooltipSubValueCon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #141630;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &.data-value {
    color: #141630;
    font-family: Inter;
    font-size: 0.875rem;
    gap: 0.1rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0em;
    text-align: left;
    span {
      font-family: Inter;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.06rem;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;

export const Subvaluedata = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;

  span {
    font-size: 0.563rem;
    font-weight: 400;
    text-align: end;
  }
`;
export const SpaceHolderDiv = styled.div`
  width: 0.88rem;
  height: 0.88rem;
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TooltipValueTotal = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.938rem;
  letter-spacing: 0em;
  text-align: left;
`;

export const TotalTooltipSubValueCon = styled.div`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.938rem;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  span {
    font-size: 0.875rem;
    font-weight: 700;
    text-align: end;
  }
`;

export const ColorCircle = styled.div`
  min-width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#000"};
  border: 1px solid #ffffff;
`;
