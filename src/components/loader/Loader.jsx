import React from "react";
import { LogoContainer, Span, SpinningLoader, Wrapper } from "./index.sc";
import { ReactComponent as FAOLogo } from "../../assets/logo/FAO.svg";

const Loader = ({ type, height = 24, width = 24, spinnerWidth = 5 }) => {
  if (type === "spinning") {
    return (
      <Wrapper>
        <SpinningLoader
          className="spinner"
          height={height}
          width={width}
          border={spinnerWidth}
        />
      </Wrapper>
    );
  }
  if (type === "spinnerWithLogo") {
    return (
      <Wrapper>
        <SpinningLoader
          className="spinner"
          height={height}
          width={width}
          border={spinnerWidth}
        />
        <LogoContainer>
          <FAOLogo />
        </LogoContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Span className="loader"></Span>
    </Wrapper>
  );
};

export default Loader;
