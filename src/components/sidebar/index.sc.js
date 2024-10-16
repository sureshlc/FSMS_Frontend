import styled from "styled-components";

export const BarData = styled.div`
  width: 100%;
  height: 100%;
  /* margin-top: 1.5rem; */
  flex-wrap: wrap;
  padding: 2rem 0 1rem 1.5rem;
  background: #ffffff;
  &.collapsed {
    opacity: 0;
  }
  &.hovers {
    opacity: 1;
  }
`;

export const StyledItem = styled.div`
  width: 100%;
  max-width: 100%;
  height: 2.5rem;
  /* padding-right: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  color: #242639;
  font-family: Archivo;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #009edb;
  }
  &.selected {
    font-weight: 700;
    color: #009edb;
    /* &::after {
      content: "";
      height: .09rem;
      background: #009edb;
      margin-top: .6rem;
    } */
  }
`;

export const RecentText = styled.div`
  font-family: Archivo;
  font-size: 12.96px;
  font-weight: 700;
  line-height: 24.96px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #7b8092;
  text-transform: uppercase;
`;

export const Recent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
`;

export const EllipsisRefWrapper = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.63rem;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
`;
