import styled from 'styled-components'

export const Img = styled.img`
  max-width: 100%;
  height: auto;
`

export const ChipLabel = styled.span`
  display: block;
  white-space: nowrap;
  padding: 0 0.6rem 0 0.6rem;
`

export const CloseIcon = styled.img`
  cursor: pointer;
  opacity: 0.7;
  margin: 0 0.37rem 0 0;
  width: 1.3rem;

  &:hover {
    opacity: 1;
  }
`
export const ChipBox = styled.div`
  box-sizing: border-box;
  font-weight: 400;
  font-weight: ${(props) => (props.type === 'status' ? '500' : '400')};
  font-size: ${(props) => (props.type === 'status' ? '0.6875rem' : '0.8rem')};
  outline: none;
  text-align: center;
  text-transform: capitalize;
  color: #000;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.type === 'status' ? '3px 6px' : '5px 8px')};
  border-radius: ${(props) => (props.type === 'status' ? '24px' : '30px')};
  gap: ${(props) => (props.type === 'small' ? '0.4rem' : '0.625rem')};
  height: 'auto';
  background: #fff;
  gap: 5px;
  background: #fff;
  border: 1px solid #6a6a6a;
  /* flex: none; */
  height: ${(props) =>
    props.type === 'status'
      ? '22px'
      : props.type === 'small'
      ? '19px'
      : '24px'};
  /* order: 0; */
  /* flex-grow: 0; */
  cursor: pointer;
`
export const ContentContainer = styled.span`
  /* text-align: initial;
  font-weight: ${(props) => (props.type === 'status' ? '500' : '400')};
  line-height: ${(props) =>
    props.type === 'status'
      ? '1rem'
      : props.type === 'small'
      ? '0.5625rem'
      : '0.6825rem'};
  height: ${(props) =>
    props.type === 'status'
      ? '1rem'
      : props.type === 'small'
      ? '0.5625rem'
      : '0.6825rem'};
  font-size: ${(props) =>
    props.type === 'status'
      ? '11px'
      : props.type === 'small'
      ? '8px'
      : '12px'}; */
  display: flex;
  font-weight: ${(props) => (props.type === 'status' ? '500' : '400')};
  font-size: ${(props) =>
    props.type === 'status' ? '11px' : props.type === 'small' ? '8px' : '12px'};
  align-items: center;
  gap: 7px;
`

export const Icon = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  /* display: inline-flex; */
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.type === 'small' ? '0.5625rem' : '0.875rem')};
  width: ${(props) => (props.type === 'small' ? '0.5625rem' : '0.875rem')};
  svg {
    height: 100%;
    max-width: 100%;
    width: auto;
  }

  img {
    width: 100%;
    height: 100%;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
`
export const Badge = styled.span`
  width: auto;
  height: 100%;
  align-items: center;
  background: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  height: ${(props) => (props.type === 'small' ? '0.5625rem' : '0.875rem')};
  width: ${(props) => (props.type === 'small' ? '0.5625rem' : '0.875rem')};
  svg {
    height: 100%;
    max-width: 100%;
    width: auto;
  }
  img {
    width: 100%;
    height: 100%;
  }
`

export const TitleSpanText = styled.span`
  max-width: 7rem;
  height: ${(props) =>
    props.type === 'small'
      ? '0.5625rem'
      : props.type === 'status'
      ? ' 1rem'
      : '0.875rem'};
  /* width: ${(props) =>
    props.type === 'small'
      ? '2.125rem'
      : props.type === 'status'
      ? '1.6875rem'
      : '3.125rem'}; */
  font-weight: 400;
  font-size: 0.75rem;
  line-height: ${(props) =>
    props.type === 'small' ? '0.5625rem' : '0.875rem'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
