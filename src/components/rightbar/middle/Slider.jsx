import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalData } from "../../../hooks/GlobalContext";
import { NewYearColumnGraph } from "../../../Viewer/NewGraphs/NewYearColumnGraph";
import {
  SliderContainer,
  Wrapper,
  YearSlider,
  YearTooltip,
} from "./styled/slider.sc";
import useQueryParams from "../../../hooks/useQueryParams";

// TODO: get average Year data from props instead
// TODO: use url for the current year
const Slider = ({ maxYear, minYear }) => {
  const queryParams = useQueryParams();
  const currentYear = queryParams.getQueryParam("year");

  return (
    <SliderContainer>
      <Wrapper>
        <NewYearColumnGraph />
      </Wrapper>
      <YearTooltip value={currentYear} minYear={minYear} maxYear={maxYear}>
        {currentYear}
      </YearTooltip>
    </SliderContainer>
  );
};

export default Slider;
