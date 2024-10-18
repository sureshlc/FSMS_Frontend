import styled from "styled-components";

export const TabContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2.25rem;
  padding: 4px;
  display: flex;
  background-color: rgba(241, 242, 249, 0.9);
  flex-direction: row;
  // justify-content: center;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
`;

export const TabItem = styled.div`
  padding: 10px;
  font-family: "Archivo", sans-serif;
  font-size: 12px;
  width: ${({ isSingleItem }) => (isSingleItem ? "fit-content" : "100%")};
  /* min-width: 4.8rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease;
  color: ${({ isActive }) => (isActive ? "#000" : "#666")};
  font-weight: 600;
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-radius: 3px;
  text-transform: capitalize;

  & > div {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Slider = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  transition: left 0.3s ease-out, width 0.3s ease-out;
  z-index: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
