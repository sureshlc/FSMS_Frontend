import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  &.wrapped {
    height: 50%;
  }
`;

export const ContainerDiv = styled.div`
  text-align: right;
  display: flex;
  flex-direction: ${(props) => (props.editMode ? "column" : "row-reverse")};
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border-color: #ddd;
  padding: 0.25rem;
  font-size: 0.8125rem;
  &:focus {
    outline: none;
  }
`;

export const ButtonsCont = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const CancelButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 0.6125rem;
  cursor: pointer;
  height: 1rem;
`;

export const SaveButton = styled.button`
  border: none;
  background-color: #009edb;
  border-radius: 0.125rem;
  color: #fff;
  font-size: 0.6125rem;
  cursor: pointer;
  height: 1rem;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  &.wrapped{
    margin-bottom: ${(props) => (props.hasSubLabel ? "0.125rem" : "0")};
  }
`;

export const Title = styled.div`
  color: #000;
  display: flex;
  gap: 0.5rem;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;

  span {
    color: #7b8092;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.9075rem; /* 114.286% */
    letter-spacing: -0.28px;
    text-transform: capitalize;
  }

  &.bigger-title {
    text-transform: capitalize;
    font-weight: 700;
    font-family: Archivo;
    font-size: 0.813rem;
  }
`;

export const CountryFlagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
  .country-code{
    margin: 0 0.313rem 0 0.625rem;
  }
  &.wrapped{
    gap: 0rem;
    .country-code{
      margin: 0 0.25rem 0 0.5rem;
    }
  }
`;

export const CountryName = styled.div`
  color: #7b8092;
  font-family: Poppins;
  font-size: 0.81rem;
  font-style: normal;
  display: flex;
  gap: 4px;
  font-weight: 600;
  line-height: 1rem; /* 123.077% */
  &.MASH {
    color: #3f5270;
    font-family: Inter;
    font-size: 12px;
    display: flex;
    gap: 4px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const CountryFlag = styled.img`
  width: 14px;
  height: 14px;
`;

export const SubLabel = styled.div`
  color: #7b8092;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

export const PopOverContentWrapper = styled.div``;
