import React, { useState } from "react";
import styled from "styled-components";
import { AccordionArrow, DownAroowicon, UpArrowicon } from "../../assets/icons";
import {
  AccordionBody,
  AccordionBox,
  //   AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionIconData,
  AccordionWrapper,
  CountryData,
  CountryData1,
  DataContent,
  HeadingContent,
  SubTitleData,
  TitleData,
} from "./index.sc";
import AccordionContent from "../Layout/FIrst/AccordionContent";
import { useQuery } from "@tanstack/react-query";
import { getAlertData } from "../../services";
import { rightSectionMockData } from "../../mock-data";
import useQueryParams from "../../hooks/useQueryParams";

const AccordionItem = ({ title, value, noAlert, data, isOpen, onClick }) => {
  return (
    <AccordionBox
      className={isOpen ? "active" : ""}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <AccordionIconData>
        <HeadingContent>
          <AccordionHeader
          // onClick={onClick}
          >
            <AccordionIcon>
              <AccordionArrow isOpen={isOpen} fill={"#141630"} />
            </AccordionIcon>
            <TitleData className={isOpen ? "active" : ""}>
              {title}
              {!noAlert && <span> Rank</span>}
            </TitleData>
            {/* <SubTitleData>{subtitle}</SubTitleData>{" "} */}
          </AccordionHeader>
          {/* <AccordionIcon onClick={onClick}>
              {isOpen ? <UpArrowicon /> : <DownAroowicon />}
            </AccordionIcon> */}
        </HeadingContent>
      </AccordionIconData>
      <AccordionBody>
        <AccordionContent accTitle={value} items={data} isOpen={isOpen} />
      </AccordionBody>
    </AccordionBox>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "" } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];
  const isAllCountry = countryName === "All Mashreq Countries";

  const { data: alertData = [] } = useQuery({
    queryKey: [
      "alertData",
      isAllCountry ? true : false,
      isAllCountry ? null : countryName,
    ],
    queryFn: () =>
      getAlertData({
        threshold: isAllCountry ? true : false,
        area: isAllCountry ? null : countryName,
      }),
    select: (response) => {
      const res = response?.data?.data;
      const filteredRes = res.filter((ele) => ele.value !== "food_security");

      const bottomThreeRightSectionData = rightSectionMockData.map((ele) => ({
        ...ele,
        data: ele.data.slice(0, 4),
      }));
      if (isAllCountry) return [...filteredRes, ...bottomThreeRightSectionData];
      const filteredRightSectionData = rightSectionMockData.map((ele) => ({
        ...ele,
        data: ele.data.filter((item) => item.area === countryName),
      }));
      const finalData = [...filteredRes, ...filteredRightSectionData];
      return finalData;
    },
    refetchOnWindowFocus: false,
  });

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };
  return (
    <AccordionWrapper>
      {alertData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.displayName}
          value={item.value}
          noAlert={item?.noAlertText}
          data={item.data}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;
