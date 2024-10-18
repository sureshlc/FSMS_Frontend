import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  /* height: 20%; */
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${(props) => (props.active ? "#22B9FF" : "#DBDFF1")};
  text-align: center;
  box-shadow: 0px 4px 0px 0px
    ${(props) => (props.active ? "#22B9FF" : "#DBDFF1")};
  background-color: ${(props) => (props.active ? "#F0FAFF" : "white")};
  color: ${(props) => (props.active ? "#22B9FF" : "#777777")};
  cursor: pointer;
`;

export const ContainerBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 10px;
`;
export const DataBlank = styled.div`
  width: 100%;
  display: grid;
  height: 20%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  min-height: 90.58px;
`;
export const DataEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  background: #f3f7fc;
`;

export const LogoBox = styled.div``;

export const DataBox = styled.div`
  text-align: center;
  gap: 5px;
`;

export const ValueBox = styled.div`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const WeightBox = styled.div`
  color: #000;
  font-family: Archivo;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.34px;
  display: flex;
  justify-content: start;
`;
