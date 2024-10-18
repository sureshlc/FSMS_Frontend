import styled from "styled-components";

export const AccordionWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid;
  grid-template-columns: auto; */
  display: flex;
  flex-direction: column;
  gap: 0.94rem;
  background-color: #dbe9f4;
  padding: 0rem 0.94rem 0rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
`;

export const AccordionBox = styled.div`
  position: relative;
  width: 100%;
  height: 24%;
  padding: 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #e2e2eb;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.4s ease;

  /* justify-content: space-between; */
  &.active {
    height: 51%;
    transition: all 0.4s ease;
    /* &:hover {
      background: white;
    } */
  }
  /* &:hover {
    background-color: #e5f5fb;
  } */
`;

export const AccordionHeader = styled.div`
  width: 100%;
  height: 5%;
`;
export const AccordionBody = styled.div`
  width: 100%;
  height: 100%;
`;
export const AccordionIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 1.35rem;
  width: 1.25rem;
  height: 1.25rem;
  svg {
    height: 100%;
  }
`;
