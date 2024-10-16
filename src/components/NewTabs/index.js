import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TabContainer, TabItem, Slider } from "./index.sc";

const NewTabs = ({ items, onChange, activeIndex }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabContainerRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: "0px", width: "0px" });

  const handleItem = (index) => {
    setActiveTab(index);
    onChange(index);
  };

  useEffect(() => {
    if (activeIndex) setActiveTab(activeIndex);
  }, [activeIndex]);
  useEffect(() => {
    const tabElements = Array.from(tabContainerRef.current.children).filter(
      (child) => child.getAttribute("role") === "tabitem"
    );
    const activeTabElement = tabElements[activeTab];
    if (activeTabElement) {
      setSliderStyle({
        left: `${activeTabElement.offsetLeft}px`,
        width: `${activeTabElement.offsetWidth}px`,
      });
    }
  }, [activeTab, items]);

  return (
    <TabContainer ref={tabContainerRef}>
      <Slider style={sliderStyle} />
      {items?.map((item, index) => (
        <TabItem
          key={item.id}
          isActive={activeTab === index}
          onClick={() => handleItem(index)}
          role="tabitem"
          isSingleItem={items.length <= 3}
        >
          {item.title}
        </TabItem>
      ))}
    </TabContainer>
  );
};

NewTabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NewTabs;
