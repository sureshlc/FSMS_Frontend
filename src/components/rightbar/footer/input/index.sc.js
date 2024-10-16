import styled from "styled-components";
export const Wrapper = styled.div`
  width: 70%;
  padding-right: 3rem;
`;
export const FormWrapper = styled.form`
  width: calc(7.5rem + 1.5rem);
  height: 50px;
  display: flex;
  cursor: pointer !important;
  margin: 0 auto;
  transition: width 0.3s ease-out;
  &.expand {
    border-radius: 3.75rem;
    width: 100%;
    background: #545970;
    box-shadow: 0px 4px 10px 0px #34394933;
    transition: width 0.3s ease-out;
  }
`;

export const IconWrap = styled.div`
  position: relative;
  right: 1.5%;
  z-index: 1;
  opacity: ${({ inputLength }) => (inputLength === 0 ? 0.5 : 1)};
  &:hover {
    cursor: ${({ inputLength }) =>
      inputLength !== 0 ? "pointer" : "not-allowed"};
  }
  text-align: center;
  display: flex;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  top: 23%;
  justify-content: center;
`;
export const AutocompleteSuggestions = styled.div`
  bottom: 50%;
  box-shadow: 0px 4px 6px 0px #0000001a;
  border-radius: 8px;
  padding: 1rem 0rem;
  background-color: white;
  position: absolute;
  overflow: auto;
  width: 70%;
  max-height: 5rem;
`;

export const SuggestionItem = styled.div`
  width: calc(100% -25px);
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapsearch = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 1;
  right: 50%;
  top: 0.7rem;
  cursor: pointer;
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin: auto;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  font-size: 1rem;
  cursor: pointer;
  right: 3%;
  z-index: 1;
`;
