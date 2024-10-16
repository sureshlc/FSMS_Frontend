import styled from "styled-components";

export const L3HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
export const L3HeaderTitleCon = styled.div``;
export const L3HeaderTitle = styled.div`
  color: #252f4a;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
`;
export const L3HeaderSubTitle = styled.div`
  color: #7b8092;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const BorderDiv = styled.div`
  width: 0.063rem;
  height: 3rem;
  background-color: #d3d3d3;
`;
export const CountryChipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
export const CountryChip = styled.div`
  min-width: 5rem;
  height: 3rem;
  border-radius: 0.625rem;
  padding: 1rem;
  background: #a0b3d1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  //text css
  color: #fff;
  text-align: right;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
  text-transform: uppercase;
  &.secondary {
    background-color: #8976f2;
  }
`;
export const AddCountry = styled.div`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  border: 1px solid #d0d3db;
  background: #eef1f9;
`;
export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: auto;
`;
export const Icon = styled.div`
  width: 1.7rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;
  &.active {
    background-color: #009edb;
    color: #fff;
  }
`;
export const CloseModalCon = styled.div`
  cursor: pointer;
`;
