import styled from "styled-components";

export const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  padding: 2.5rem 2.5rem 1.5rem 2.5rem;
  background: #fff;
`;
export const BoxTitleContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: flex-start;
`;
export const BoxTitle = styled.div`
  color: #000;
  font-family: Archivo;
  font-size: 1.063rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.02rem;
`;
export const BoxSubTitle = styled.div``;
export const BoxBody = styled.div`
  width: 100%;
  height: calc(100% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  &.h-reduce {
    height: calc(100% - 3.5rem);
  }
  .tick {
    color: #7b8092;
    font-family: Archivo;
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.02em;
    text-align: left;
  }
  .line-circle-grp {
    width: 4px;
    height: 4px;
    border: 1px;
    background: white;
  }
  .line-bg-rect-group {
    color: white;
    background: white;
  }
`;
export const GraphCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
export const FlexColDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
