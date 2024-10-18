import styled from 'styled-components'

export const InputWrapper = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &,
  > * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
export const Input = styled.input`
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 0.75rem;
  border:none;
  border-radius: 0.25rem;
  background-color: #ffffff;
  color: #2f3446;
  font-weight: 400;
  font-size: 0.813rem;
  line-height: 1.188rem;
  &::placeholder {
    color: ${(props) => props.placeholderColor || '#a1aab3'};
  }
  // &:hover:not([disabled]) {
  //   border: ${(props) => `${props.pseudoBorder || '1px solid #e20074'}`};
  // }
  // &.error,
  // &.error:hover:not([disabled]),
  // &.error:focus {
  //   border: 1px solid #da0000;
  // }
  // &:focus {
  //   border: ${(props) => `${props.pseudoBorder || '1px solid #e20074'}`};
  //   color: #2f3446;
  // }
  // &.disabled {
  //   color: #a1aab3;
  //   background: #d9d9d9;
  //   cursor: not-allowed;
  // }
  ${({ inputStyle }) => inputStyle}
  &.mapUi {
    border: none;
    &:hover,
    &:focus {
      border: none;
    }
  }
  /* Remove the default search icon from input type search */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &::-moz-search-cancel-button,
  &::-moz-search-decoration {
    display: none;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
  padding-right: 1.875rem;
`

export const Form = styled.form`
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
`
export const Section = styled.div`
  width: 100%;
  display: flex;
  gap: 2.6rem;
  align-items: flex-end;
`
export const ErrorMsg = styled.span`
  color: #da0000;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.85rem;
  ${({ errorStyle }) => errorStyle}
`
export const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 0.875rem;
`
export const Label = styled.label`
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
  margin-bottom: 7px;
  line-height: initial;
`
export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`
export const Symbol = styled.span`
  color: #e20074;
  margin-right: 0.25rem;
`
