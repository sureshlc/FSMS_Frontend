import styled, { keyframes } from "styled-components";

// dropdown sc
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
export const DropdownContainer = styled.div`
  display: flex;
  position: relative;
  /* min-width: max-content; */
  // width: ${(props) => (props.newWidth ? `${props.newWidth}rem` : "100%")};
  /* min-width: 17.5rem; */
  width: 100%;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  /* border-radius: 0.3125rem;
  border: 1px solid #dedede; */
  background: transparent;
`;

export const DropdownButton = styled.button`
  width: calc(100% - 1.125rem);
  height: 100%;
  background: transparent;
  border-radius: 0.375rem;
  border-color: ${({ active }) => (active ? "#000000" : "transparent")};
  border-width: ${({ borderWidth }) => borderWidth}px;
  padding: 0.62rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 0.7rem;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.44rem;
  color: #fff;
  font-family: Archivo;
  font-size: 1.06rem;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 94.118% */
  letter-spacing: -0.34px;
  text-transform: uppercase;
  white-space: nowrap;
`;
export const CountIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6875rem;
`;
export const DropdownList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  /* position: absolute;
  left: 0;
  top: 2.5rem; */
  z-index: 99999;
  /* border-radius: 0.375rem; */
  /* border: 1px solid #c6c2de; */
  gap: 1.25rem;
  display: flex;
  background: rgba(74, 196, 246, 1);
  /* box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2); */
  list-style-type: none;
  padding: 1.25rem;
  margin: 0;
  width: calc(100% + 2rem);
  // width: ${(props) => (props.newWidth ? `${props.newWidth}rem` : "100%")};
  min-width: 17.5rem;
  /* min-width: max-content; */
  max-height: ${({ dropdownListHeight }) => `${dropdownListHeight}rem`};
  height: auto;
  display: grid;
  pointer-events: ${({ open }) => (open ? "default" : "none")};
  grid-template-columns: auto auto;
  transition: 0.3s ease;
  opacity: ${({ open }) => (open ? 0.95 : 0)};
  transform: ${({ open }) => (open ? "translateY(0px)" : "translateY(-20px)")};
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const DropdownListItem = styled.li`
  min-height: 2rem;
  height: fit-content;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  width: 90%;
  display: flex;
  align-items: center;
  gap: 0.813rem;
  &:hover,
  &.selected {
    background-color: #ffffff;
  }
  &.dropdown-search {
    padding: 0.2rem 0.938rem;
    border-bottom: 1px solid #c6c2de;
  }
`;
export const OptionTitle = styled.span`
  font-size: 0.938rem;
  font-weight: 500;
  line-height: 1rem;
`;
export const ListWrp = styled.div`
  position: absolute;
  left: -1rem;
  top: 3.5rem;
  width: calc(100% + 2rem);
  /* background-color: #ffffff; */
  /* box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2); */
  display: flex;
  /* flex-direction: column; */
  /* &.custom {
    width: fit-content;
  } */
`;
export const FilterBody = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  .rdrDateDisplayWrapper {
    display: none;
  }
`;
export const IconContainer = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ripple 0.6s linear infinite;
  svg {
    width: 100%;
    height: 100%;
  }

  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1),
        0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1),
        0 0 0 60px rgba(255, 255, 255, 0.1);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1),
        0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1),
        0 0 0 80px rgba(255, 255, 255, 0);
    }
  }
`;

export const DropdownInputSearch = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  background: #ffffff;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  height: 100%;
  /* padding: 0 0.5rem; */
  &::placeholder {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #555555;
    display: flex;
    align-items: flex-end;
  }
`;
