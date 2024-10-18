import React, { useState } from "react";
import {
  AccordionBody,
  AccordionBox,
  AccordionHeader,
  AccordionIcon,
  AccordionWrapper,
  HeaderWrapper,
} from "./index.sc";
import { AccordionArrow } from "../../assets/icons";
import { OverviewInfoAlertMapping } from "../../constants/gridMapping";
import { OverviewMapping } from "../../constants/gridMapping";

const AccordionItem = ({
  isOpen,
  length,
  onClick = () => {},
  activeHeight,
  item,
  titleComponent: TitleComponent,
  bodyComponent: AccordionBodyComponent,
  index,
}) => {
  const { displayName: title = "", data } = item;
  const countryIsoCode = data?.length > 1 ? "MASH" : data[0]?.iso3_code;
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
      <AccordionHeader>
        <AccordionIcon>
          <AccordionArrow isOpen={isOpen} />
        </AccordionIcon>
        {/* <HeaderWrapper> */}
        {/* add header component */}
        {TitleComponent ? (
          <TitleComponent
            title={title}
            countryIsoCode={countryIsoCode}
            info={OverviewInfoAlertMapping.info[index]}
            enableIcon={OverviewMapping?.three[0]?.items[index]?.enableIcon}
            iconColor={OverviewMapping?.three[0]?.items[index]?.iconColor}
            additionalClass={
              OverviewMapping?.three[0]?.items[index]?.additionalClassName
            }
            alert={item?.alert}
          />
        ) : (
          title
        )}
        {/* </HeaderWrapper> */}
      </AccordionHeader>
      <AccordionBody>
        {AccordionBodyComponent && (
          <AccordionBodyComponent
            accTitle={item?.value}
            items={item?.data}
            isOpen={isOpen}
            fixedTooltip={item?.fixedTooltip}
          />
        )}
      </AccordionBody>
    </AccordionBox>
  );
};

const NewAccordion = ({
  activeHeight = 40,
  data: accordionData = [],
  titleComponent,
  bodyComponent,
  info,
  alert,
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
          index={index}
        />
      ))}
    </AccordionWrapper>
  );
};

export default NewAccordion;
