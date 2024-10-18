import styled from "styled-components";
export const SliderContainer = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
  align-items: center;
  text-align: center;
  box-sizing: content-box;
`;

export const YearSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  border: 5px solid rgba(255, 255, 255, 0.9);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
  border-radius: 5px;
  outline: none;
  position: relative;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: white;
    border: 5px solid rgba(0, 0, 0, 1);
    border-radius: 50%; // Make the thumb a circle
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
`;

export const YearTooltip = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 1);
  color: #ffffff;
  border-radius: 5px;
  width: 34px;
  height: 16px;
  font-family: Archivo;
  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  padding: 4px 8px 4px 8px;
  font-weight: bold;
  bottom: 24px;
  z-index: 1;
  left: calc(
    (100% - 25px) *
      ${(props) =>
        (props.value - props.minYear) / (props.maxYear - props.minYear)}
  );

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 24px;
    transform: translateX(-50%);
    border-top: 6px solid rgba(0, 0, 0, 1);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 1.5rem;
  /* width: 40vw; */
  width: 100%;
  margin: auto;
  border-bottom: 2px solid #434343;
`;
