import React, { useEffect, useRef, useState } from "react";

import {
  BoxBody,
  BoxContainer,
  GraphTabsWrapper,
  Year,
  YearTabsWrapper,
} from "./index.sc";
import Header from "../Header";
import Tabs from "../tabs";
const ContentBox = ({
  title,
  enableIcon = false,
  iconColor,
  secondaryTitle,
  subLabel,
  countryIsoCode,
  content,
  isChild,
  alert,
  info,
  graphTabs,
  onGraphTabsChange,
  activeYear,
  additionalClass,
}) => {
  const headerRef = useRef(null);

  const headerHeight = subLabel ? 32 : 16;
  const [activeTab, setActiveTab] = useState(0);

  const handleGraphTabChange = (index) => {
    onGraphTabsChange(index);
    setActiveTab(index);
  };

  return (
    <BoxContainer isChild={isChild} className={additionalClass}>
      <Header
        ref={headerRef}
        title={title}
        enableIcon={enableIcon}
        iconColor={iconColor}
        secondaryTitle={secondaryTitle}
        subLabel={subLabel}
        countryIsoCode={countryIsoCode}
        alert={alert}
        info={info}
        additionalClass={additionalClass}
      />
      <BoxBody headerHeight={headerHeight} className={additionalClass}>
        {graphTabs && (
          <YearTabsWrapper isYearPresent={activeTab === 0}>
            <GraphTabsWrapper className="graph-tabs">
              <Tabs
                variant="card"
                items={graphTabs}
                onChange={handleGraphTabChange}
                activeColor="#009EDB"
                isContent={false}
              />
            </GraphTabsWrapper>
            {activeTab === 0 && <Year>{activeYear}</Year>}
          </YearTabsWrapper>
        )}
        <div
          style={{
            width: "100%",
            height: graphTabs ? "calc(100% - 2.5rem)" : "100%",
          }}
        >
          {content}
        </div>
      </BoxBody>
    </BoxContainer>
  );
};

export default ContentBox;
