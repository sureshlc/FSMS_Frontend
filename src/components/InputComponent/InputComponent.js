import React, { useState } from "react";
import {
  ClearButton,
  ErrorMsg,
  Input,
  InputWrapper,
  Label,
  TopSection,
  Symbol,
} from "./index.sc";
import PropTypes from "prop-types";
import ClearIcon from "./assets/Clear";
import { useTheme } from "../../hooks/Theme";

const inputSize = {
  large: "2.5rem",
  small: "2.125rem",
};

const InputComponent = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  inputStyle,
  errorStyle,
  error = "",
  size = "small",
  disabled = false,
  placeholderColor,
  pseudoBorder,
  inputRef = null,
  mapUi = false,
  label,
  isRequired = false,
  tagName,
}) => {
  const theme = useTheme();
  const inputTheme = {
    color: theme.contrastText,
    "&:hover:not([disabled])": {
      // borderColor: theme.main,
      border: "none",
    },
    "&:focus": {
      // borderColor: theme.main,
      border: "none",
    },
  };
  return (
    <TopSection test-tag={tagName}>
      {label && (
        <Label>
          {isRequired && <Symbol>*</Symbol>}
          {label}
        </Label>
      )}
      <InputWrapper
        className="input-wrapper"
        width={inputStyle?.width || "100%"}
        height={inputStyle?.height || inputSize[size]}
      >
        <Input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          placeholderColor={placeholderColor}
          pseudoBorder={pseudoBorder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          inputStyle={{
            ...inputTheme,
            ...inputStyle,
            width: "100%",
            height: "100%",
          }}
          className={`${disabled ? "disabled" : ""} ${error ? "error" : ""} ${
            mapUi ? "mapUi" : ""
          }`}
          disabled={disabled}
        />
        {type === "search" && value && (
          <ClearButton
            className="clear-button"
            onClick={() => {
              onChange({ target: { name: name, value: "" } });
            }}
          >
            <ClearIcon />
          </ClearButton>
        )}
        {error && (
          <ErrorMsg className="error" errorStyle={errorStyle}>
            {error}
          </ErrorMsg>
        )}
      </InputWrapper>
    </TopSection>
  );
};

// Define prop types for InputComponent
InputComponent.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  pseudoBorder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  inputStyle: PropTypes.object,
  errorStyle: PropTypes.object,
  error: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default InputComponent;
