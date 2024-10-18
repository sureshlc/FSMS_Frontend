import styled from "styled-components";

export const SubLabelStyles = styled.div`
  margin-left: 20px;
`;

export const AccordionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  /* overflow-y: auto;
  overflow-x: hidden; */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
`;
export const AccordionBox = styled.div`
  width: 100%;
  height: ${({ length, activeHeight }) =>
    `calc(${((100 - activeHeight) / (length - 1)).toFixed(2)}%)`};
  padding: 1.88rem 1.5rem 0.88rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.4s ease;
  border-radius: 0.1875rem;
  /* border: 1px solid #eaeaea; */

  /* justify-content: space-between; */
  &.active {
    height: ${({ activeHeight }) => `${activeHeight}%`};
    transition: all 0.4s ease;

    &:hover {
      background: white;
    }
  }
  &:hover {
    background-color: #e5f5fb;
  }

  /* @media (max-height: 815px) {
    height: 15%;
    &.active {
      height: 55%;
    }
  } */
`;

export const AccordionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const AccordionBody = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
`;
export const AccordionIcon = styled.div`
  width: 0.56rem;
  height: 1rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
export const HeaderWrapper = styled.div`
  width: calc(100% - 0.56rem);
  height: 100%;
  display: flex;
  align-items: center;
`;
