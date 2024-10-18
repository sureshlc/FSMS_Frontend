import React, { useState } from "react";
import Yieldlogo from "../../../assets/icons/components/Yieldlogo";
import Areaharvastedlogo from "../../../assets/icons/components/Areaharvastedlogo";
import Productionlogo from "../../../assets/icons/components/Productionlogo";
import { useGlobalData } from "../../../hooks/GlobalContext";
import {
  Box,
  BoxContainer,
  ContainerBox,
  DataBox,
  LogoBox,
  ValueBox,
  WeightBox,
} from "./styled/graphbottom.sc";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  ITEM_ENTITY,
  SIMILAR_INTEREST_ENTITY,
  YEAR_ENTITY,
} from "../../../constants/default";

// TODO: this is part of secondLayout, make it generic, try not to take global data, instead pass props
// TODO: handle loading state also, as a prop from secondLayout

const GraphBottom = () => {
  const [, setActiveBox] = useState(1);

  const {
    similar_interests,
    dropDownSelectedData,
    // dropDownSelectedData,
    // currentYear,
    // viewer,
    setViewer,
    gloablLoading,
    headerLoading,
  } = useGlobalData();

  const queryParams = useQueryParams();
  const currentYear = queryParams.getQueryParam(YEAR_ENTITY);
  const viewer = queryParams.getQueryParam(SIMILAR_INTEREST_ENTITY);
  const currentItem = queryParams.getQueryParam(ITEM_ENTITY);

  const handleBoxClick = (el, index) => {
    setActiveBox(index);
    setViewer(el);
    queryParams.setQueryParam(SIMILAR_INTEREST_ENTITY, el);
  };

  function valueUnit(obj, el, currentYear) {
    const findObj = obj[el];
    for (let i = 0; i < findObj?.length; i++) {
      if (findObj[i].Year == currentYear) {
        return `${formatNumber(findObj[i].Value)} ${findObj[i].Unit}`;
      }
    }
  }

  function returnLogo(el) {
    const logoObject = {
      Yield: <Yieldlogo isActive={el === viewer} />,
      "Area harvested": <Areaharvastedlogo isActive={el === viewer} />,
      Production: <Productionlogo isActive={el === viewer} />,
    };

    return logoObject[el];
  }

  const ranges = [
    { divider: 1e18, suffix: "E" },
    { divider: 1e15, suffix: "P" },
    { divider: 1e12, suffix: "T" },
    { divider: 1e9, suffix: "G" },
    { divider: 1e6, suffix: "M" },
    { divider: 1e3, suffix: "K" },
  ];

  const formatNumber = (n) => {
    if (n === 0 || n < 1000 || Number.isNaN(n)) {
      return n;
    }
    for (let i = 0; i < ranges.length; i++) {
      if (n < 0) {
        return "-" + formatNumber(-n);
      }
      if (n >= ranges[i].divider) {
        const formattedValue = (n / ranges[i].divider).toFixed(1);
        if (formattedValue.endsWith(".0")) {
          return parseInt(formattedValue) + ranges[i].suffix;
        } else {
          return formattedValue + ranges[i].suffix;
        }
      }
    }
    return n.toString();
  };

  // FIXME: instead of using global state lets use props
  return (
    <BoxContainer>
      {similar_interests
        ? Object.keys(similar_interests)?.map((el, i) => {
            return (
              <Box
                key={i}
                active={el === viewer}
                onClick={() => handleBoxClick(el, i)}
              >
                <ContainerBox>
                  <LogoBox> {returnLogo(el)} </LogoBox>

                  <DataBox>
                    <ValueBox>
                      {el} - {currentItem}
                    </ValueBox>
                    <WeightBox>
                      {valueUnit(similar_interests, el, currentYear)}
                    </WeightBox>
                  </DataBox>
                </ContainerBox>
              </Box>
            );
          })
        : null}
    </BoxContainer>
  );
};

export default GraphBottom;
