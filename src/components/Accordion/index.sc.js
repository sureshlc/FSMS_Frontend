import styled from "styled-components";

export const AccordionBox = styled.div`
  width: 100%;
  height: 20%;
  padding: 1.88rem 1.88rem 1.88rem 2.19rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #e2e2eb;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.4s ease;

  /* justify-content: space-between; */
  &.active {
    height: 40%;
    transition: all 0.4s ease;
    &:hover {
      background: white;
    }
  }
  &:hover {
    background-color: #e5f5fb;
  }

  @media (max-height: 815px) {
    height: 15%;
    &.active {
      height: 55%;
    }
  }
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  width: 100%;
`;
export const AccordionBody = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
  // border: 1px solid blue;
`;
export const AccordionContent = styled.div`
  height: calc(100% - 1.5rem);
  display: flex;
  flex-direction: column;
`;

export const AccordionIconData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem; // Due to this it effect in css 125% view
  /* padding: 1rem; */
  height: 1.5rem;
`;

export const AccordionIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  left: -22px;
  svg {
    height: 100%;
  }
`;

export const DataContent = styled.div``;

export const HeadingContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CountryData = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CountryData1 = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const AccordionWrapper = styled.div`
  width: 100%;
  height: 100%;

  /* display: grid;
  grid-template-columns: auto; */
  display: flex;
  flex-direction: column;
  gap: 0.94rem;
  background-color: #dbe9f4;
  padding: 1rem 0.94rem 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
`;

export const TitleData = styled.div`
  color: #141630;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.02125rem;
  text-align: left;
  > span {
    color: #7b8092;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: -0.02125rem;
  }

  // &.active {
  //   color: #009edb;
  // }
`;

export const SubTitleData = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #636363;
`;
