import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../../../hooks/Theme";
import InputComponent from "../../../InputComponent/InputComponent";
import Submiticon from "../../../../assets/icons/components/Submiticon";
import Searchicon from "../../../../assets/icons/components/Searchicon";
import ClearIcon from "../../../InputComponent/assets/Clear";
import {
  fetchSuggestions,
  submitQuery,
} from "../../../../services/suggestionsAPI";
import { useGlobalData } from "../../../../hooks/GlobalContext";
import {
  AutocompleteSuggestions,
  ClearButton,
  FormWrapper,
  IconWrap,
  IconWrapsearch,
  SuggestionItem,
  Wrapper,
} from "./index.sc";
import useDebounce from "../../../../hooks/useDebounce";

const Input = ({ expanded, setExpanded }) => {
  const theme = useTheme();
  const focusInput = useRef();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const [query, setQuery] = useState("");

  // data from suggestion API
  const [autoSuggestionData, setAutoSuggestionData] = useState([]);

  // size of suggestion 1 or 2
  const [suggestionSize, setSuggestionSize] = useState(1);

  const { sideBarClickedData } = useGlobalData();
  const debouncesearch=useDebounce(input ,500);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue)
  
  };
  useEffect(() => {
    if (debouncesearch) {
      const filteredSuggestions = autoSuggestionData.filter((item) =>
        item.toLowerCase().includes(debouncesearch.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(!!filteredSuggestions.length);
    }
  }, [debouncesearch, autoSuggestionData]);
  
  const handleSuggestionWord = (word) => {
    setInput(word);
    setSuggestionSize(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      submitQuery(input).then(() => {
        alert("Successfully submitted the query\n" + input);
        setInput("");
        setExpanded(false);
      });
      setSuggestionSize(1);
    }
  };

  const handleClearClick = (e) => {
    e.preventDefault();
    setInput("");
    setSuggestionSize(1);
  };

  const handleMouseLeave = () => {
    if (input.length === 0) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      focusInput.current.querySelector("input").focus();
    }
    if (!expanded) {
      focusInput.current.querySelector("input").blur();
      setInput("");
    }
  }, [expanded]);

  // get the dropdown data from API
  useEffect(() => {
    fetchSuggestions(debouncesearch, sideBarClickedData.name).then(
      (response) => {
        console.log("response", response);
        setAutoSuggestionData(response);
      }
    );
  }, [suggestionSize,debouncesearch, sideBarClickedData]);

  return (
    <Wrapper>
      <FormWrapper
        onMouseEnter={() => setExpanded(true)}
        onSubmit={handleSubmit}
        onMouseLeave={handleMouseLeave}
        ref={focusInput}
        className={expanded ? "expand" : ""}
      >
        <InputComponent
          inputStyle={{
            borderRadius: "3.75rem",
            background: "#545970",
            height: "60px",
            fontSize: "16px",
            paddingLeft: "1.25rem",
            color: "white !important",
            "&:focus": {
              borderColor: `#545970`,
              outline: "none",
            },
            width: expanded ? "100%" : "100%",
            pointerEvents: expanded ? "auto" : "none",
            cursor: expanded ? "pointer" : "pointer",
          }}
          type="text"
          placeholder={
            !expanded
              ? ""
              : "Example: Search For Area Harvested, Production or Yield"
          }
          value={input}
          onChange={handleInputChange}
          size="large"
        />
        {expanded ? (
          <>
            {input.length > 0 && (
              <ClearButton onClick={handleClearClick}>
                <ClearIcon />
              </ClearButton>
            )}
            <IconWrap inputLength={input.length} onClick={handleSubmit}>
              <Submiticon />
            </IconWrap>
          </>
        ) : (
          <IconWrapsearch onMouseEnter={() => setExpanded(true)}>
            <Searchicon />
          </IconWrapsearch>
        )}
        {input.length > 0 && showSuggestions && (
          <AutocompleteSuggestions>
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion}
                onClick={() => {
                  handleSuggestionWord(suggestion);
                  focusInput.current.querySelector("input").focus();
                }}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </AutocompleteSuggestions>
        )}
      </FormWrapper>
    </Wrapper>
  );
};

export default Input;
