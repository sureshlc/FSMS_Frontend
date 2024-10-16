import styled from 'styled-components'

export const ButtonComp = styled.button`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.125rem;
  outline: none;
  border: 0;
  border-radius: ${({ type }) => {
    if (type === 'circle') {
      return '50%'
    } else if (type === 'chip') {
      return '15px' // Use a large value to create a pill shape
    } else {
      return '5px'
    }
  }};
  text-align: center;
  text-transform: capitalize;
  display: flex;
  flex-direction: ${(props) =>
    props.iconPosition === 'left'
      ? `row`
      : `row-reverse`}; // specify icon position
  justify-content: center;
  align-items: center;
  padding: ${({ type }) => type != 'circle' && '0.438rem 0.938rem'};
  gap: 0.625rem;
  width: ${({ type }) => (type != 'circle' ? 'fit-content' : '1.25rem')};
  height: ${({ type }) => (type != 'circle' ? 'fit-content' : '1.25rem')};
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};

  ${({ btnStyle }) => btnStyle};

  span {
    text-align: initial;
  }

  color: ${({ disable, btnStyle = { color: '#000' }, disableStyle }) =>
    disable ? disableStyle?.color : btnStyle?.color}; // set text color
  background: ${({ backgroundColor, type, disable, disableStyle, theme }) =>
    disable
      ? disableStyle?.background
      : type === 'secondary'
      ? '#fff'
      : type === 'circle'
      ? theme.main
      : backgroundColor}; // set background  color
  border: ${({ disable, borderColor, type, disableStyle }) =>
    disable
      ? disableStyle?.border
      : type === 'secondary'
      ? `1px solid ${borderColor}`
      : 'unset'}; // set border

  &:hover {
    background: ${({
      disable,
      btnStyle = { hoverBg: 'rgb(238,241,246)' },
      disableStyle,
      type,
      theme
    }) =>
      disable
        ? disableStyle?.background
        : type === 'circle'
        ? theme.main
        : btnStyle?.hoverBg};
  }

  &:focus {
    background: ${({
      disable,
      btnStyle = { focusBg: 'rgb(234,238,243)' },
      disableStyle,
      type,
      theme
    }) =>
      disable
        ? disableStyle?.background
        : type === 'circle'
        ? theme.main
        : btnStyle?.focusBg};
  }
`

export const IconContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;

  svg {
    width: inherit;
    height: inherit;
    stroke: ${({ type }) => type === 'circle' && '#fff'};
  }

  svg path {
    ${({ disable, disableStyle = { color: '#D9D9D9' } }) =>
      disable &&
      `${
        'stroke:' + disableStyle?.color
      }`}; // specify icon color if disable and icon is an svg
  }

  img {
    ${({ disable, disableStyle = { color: '#D9D9D9' } }) =>
      disable &&
      `${
        'stroke:' + disableStyle?.color
      }`}; // specify icon color if disable and icon is an img
    width: 100%;
    height: 100%;
  }
`
