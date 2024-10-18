import styled from "styled-components";

export const BoxDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.4s ease-in;
`;

export const SmallBoxContainer = styled.div`
  height: calc(50% - 0.5rem);
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d3d3d3;
  box-shadow: 0px 2px 0px 0px rgba(226, 226, 235, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;
//primaryboxes.jsx
export const TopContainer = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: normal;
  align-content: stretch;
  padding: 3%;
`;

export const PrimaryTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: Archivo;
  font-weight: 600;
  word-wrap: break-word;
`;

export const SecondaryTitle = styled.div`
  color: black;
  font-size: 12px;
  font-family: Archivo;
  font-weight: 500;
  word-wrap: break-word;
`;

export const Chart = styled.div`
  height: calc(100% - 4rem);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: centre;
  align-items: centre;
  align-content: centre;
`;

export const Icons = styled.div`
  grid-area: icons;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  padding: 3%;
`;
export const Icon = styled.div`
  width: 1.724rem;
  height: 1.6875rem;
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
