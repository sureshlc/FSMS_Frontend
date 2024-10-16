import React, { useState } from "react";
import {
  AccordionBody,
  AccordionBox,
  AccordionIcon,
  AccordionWrapper,
} from "./index.sc";
import {
  ConsumptionMapping,
  ProductionMapping,
} from "../../constants/gridMapping";
import { useQueries } from "@tanstack/react-query";
import { getIndicatorData } from "../../services";
import { useLocation } from "react-router";
import { sidebarMockData } from "../../mock-data/sidebar";
import useQueryParams from "../../hooks/useQueryParams";
import BoxL3 from "../box-l3";
import { AccordionArrow } from "../../assets/icons";

const getTransformedData = (rawData, boxObj) => {
  if (rawData) {
    const {
      is2dData = false,
      noOfDimensions,
      is3YearAverage = false,
      latestYear = "",
      latestYearChange = 0,
      items = [],
      unit = "",
      isGreen = false,

      data = [],
    } = rawData;

    const labels = Array(noOfDimensions)
      .fill("")
      .map((ele, i) => {
        return {
          label: items[i] || `label${i}`,
          value: `value${i}`,
          color: `${boxObj?.colors[i]}`,
        };
      });

    const transformedData = data.map((dataElement, i) => {
      const commonFields = { label: dataElement?.year };
      const generatedObject = {};

      for (let j = 0; j < noOfDimensions; j++) {
        generatedObject[`value${j}`] = dataElement[`value${j}`];
        generatedObject[`yearly_change${j}`] = dataElement[`yearly_change${j}`];
      }

      return {
        ...commonFields,
        ...generatedObject,
      };
    });

    const finalRes = { data: transformedData, labels: labels };

    return {
      label: boxObj?.label,
      value: boxObj?.value,
      secondaryLabel: boxObj?.secondaryLabel,
      subLabel: boxObj?.subLabel,
      is3YearAverage: is3YearAverage,
      latestYear: latestYear,
      latestYearChange: latestYearChange,
      isGreen: isGreen,
      unit: unit,
      items: items,
      is2dData: is2dData,
      noOfDimensions,
      data: [{ component: boxObj?.component, data: finalRes }],
    };
  }
};

const AccordionItem = ({ data, isOpen, onClick }) => {
  const location = useLocation();
  const { pathname } = location;
  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;
  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "" } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];

  const userQueries = useQueries({
    queries: data.map((item) => {
      return {
        queryKey: ["accordionData", currentCategory, countryName, item?.value],
        queryFn: () =>
          getIndicatorData({
            category: currentCategory,
            area: countryName,
            indicator: item?.value,
            fromYear: "2015",
          }),
        enabled: !!item?.value,
        refetchOnWindowFocus: false,
        select: (res) => res?.data?.data,
      };
    }),
  });
  const accordionData = [];
  if (userQueries?.length > 0) {
    for (let i = 0; i < userQueries.length; i++) {
      const queryData = userQueries[i]?.data;
      if (queryData) {
        const transformedData = getTransformedData(queryData, data[i]);
        accordionData.push(transformedData);
      }
    }
  }
  return (
    <AccordionBox
      className={isOpen ? "active" : ""}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <AccordionIcon>
        <AccordionArrow isOpen={isOpen} fill={"#141630"} />
      </AccordionIcon>
      <AccordionBody>
        <BoxL3 data={accordionData} isOpen={isOpen} />
      </AccordionBody>
    </AccordionBox>
  );
};

const GridAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const accordionItems = ConsumptionMapping.three[0].items;

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  return (
    <AccordionWrapper>
      {Object.entries(accordionItems).map(([key, value], index) => {
        return (
          <AccordionItem
            key={key}
            data={value}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        );
      })}
    </AccordionWrapper>
  );
};

export const GridAccordionFoProduction = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const accordionItems = ProductionMapping.three[0].items;

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  return (
    <AccordionWrapper>
      {Object.entries(accordionItems).map(([key, value], index) => {
        return (
          <AccordionItem
            key={key}
            data={value}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        );
      })}
    </AccordionWrapper>
  );
};

export default GridAccordion;
