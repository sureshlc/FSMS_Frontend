import React, { useEffect, useState } from "react";
import {
  AccordionBody,
  AccordionBox,
  AccordionHeader,
  AccordionIcon,
  AccordionWrapper,
  SubLabelStyles,
  HeaderWrapper,
} from "./index.sc";
import { AccordionArrow } from "../../assets/icons";
import useQueryParams from "../../hooks/useQueryParams";
import { TabHeading } from "../ContentBox/index.sc";
import Tabs from "../tabs";
import { CountryFlagWrapper, CountryName } from "../Header/index.sc";
import { isoFlagMapping } from "../../constants/countryIsoMapping";
import HeaderIcon from "../../assets/icons/components/HeaderIcon";

const AccordionItem = ({
  isOpen,
  length,
  onClick = () => {},
  activeHeight,
  item,
  graphType,
  titleComponent: TitleComponent,
  bodyComponent: AccordionBodyComponent,
}) => {
  const {
    title = "",
    secondaryTitle = "",
    data,
    info = "",
    fill,
    enableIcon,
    iconColor,
    subLabel,
  } = item;

  const { getAllQueryParams } = useQueryParams();
  const { countryFilter = "", countryId } = getAllQueryParams();
  const countryName = countryFilter.split("-")[0];
  const isAllCountry = countryName === "All Mashreq Countries";

  return (
    <AccordionBox
      className={isOpen ? "active" : ""}
      length={length}
      activeHeight={activeHeight}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <AccordionHeader subLabel={subLabel}>
        <AccordionIcon>
          <AccordionArrow isOpen={isOpen} />
        </AccordionIcon>
        {/* <HeaderWrapper> */}
        {/* add header component */}
        {TitleComponent ? (
          <TitleComponent
            title={title}
            secondaryTitle={secondaryTitle}
            countryIsoCode={isAllCountry ? "MASH" : countryId}
            info={info}
            subLabel={<SubLabelStyles>{subLabel}</SubLabelStyles>}
            additionalClass="bigger-title"
            enableIcon={enableIcon}
            iconColor={iconColor}
          />
        ) : (
          title
        )}
        {/* </HeaderWrapper> */}
      </AccordionHeader>
      <AccordionBody>
        {AccordionBodyComponent && (
          <AccordionBodyComponent data={data} isOpen={isOpen} />
        )}
      </AccordionBody>
    </AccordionBox>
  );
};

const ReusableAccordion = ({
  activeHeight = 50,
  data: accordionData = [],
  titleComponent,
  bodyComponent,
  graphType,
  fill,
}) => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  return (
    <AccordionWrapper>
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          length={accordionData.length}
          activeHeight={activeHeight}
          item={item}
          bodyComponent={bodyComponent}
          titleComponent={titleComponent}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
          graphType={graphType}
        />
      ))}
    </AccordionWrapper>
  );
};

export default ReusableAccordion;
