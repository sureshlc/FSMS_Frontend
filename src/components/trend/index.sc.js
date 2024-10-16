const { default: styled } = require("styled-components");

export const TrendWrp = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const TrendDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #fe7979;
  margin-top: 0.16rem;
`;
export const TrendCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  &.flexwrap {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  &.leftwrap {
    width: 100%;
    position: relative;
  }
`;
export const TrendLabel = styled.div`
  color: #7b8092;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const TrendSubLabel = styled.div`
  color: #000;

  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const TrendIcon = styled.div`
  height: 1rem;
  width: 1.3rem;
  text-align: right;
`;
export const TrendValueCon = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.2rem;
  margin-left: 0.05rem;
  span {
    color: #7b8092;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;
