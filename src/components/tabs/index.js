import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as Styles from "./index.sc";
// import { useTheme } from "../../customHooks/themeContext";

const Tabs = ({
  items,
  onChange,
  variant,
  activeColor = "#009edb",
  inactiveColor,
  isContent,
  defaultActiveTab,
  activeTabWidthProp = 30,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const theme = {};
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [activeTabWidth, setActiveTabWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHasOverflow(tabsRef.current.scrollWidth > tabsRef.current.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    observeIntersection();
  }, [isMenuOpen]);

  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  useEffect(() => {
    const tabWidth = activeTabRef?.current?.offsetWidth;
    const leftVal = activeTabRef?.current?.offsetLeft;
    const newActiveTabWidth = activeTabWidthProp || tabWidth * 0.6;
    setUnderlineLeft(leftVal + (tabWidth * 0.20));
    setActiveTabWidth(newActiveTabWidth);
  }, [activeTab, items.length, activeTabWidthProp]);

  const observeIntersection = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        const itemsAfterFilter = entries.map((entry, index) => {
          if (entry.isIntersecting) {
            return { ...items[index], visible: true };
          } else {
            return { ...items[index], visible: false };
          }
        });
        setMenuItems(itemsAfterFilter.filter((item) => !item.visible));
      },
      { root: tabsRef.current, threshold: 1 }
    );
    const tabs = Array.from(tabsRef.current.children);
    tabs.forEach((tab) => observer.observe(tab));
    return () => {
      observer.disconnect();
    };
  };

  const onChangeTab = (index) => {
    setActiveTab(index);
    onChange && onChange(index);
  };

  const handleScroll = () => {
    observeIntersection();
    setShowLeftShadow(tabsRef.current.scrollLeft > 0);
    setShowRightShadow(
      tabsRef.current.scrollLeft <
        tabsRef.current.scrollWidth - tabsRef.current.clientWidth
    );
  };

  return (
    <Styles.Container className="tabs-asmtabs">
      <Styles.TabsWrapper
        showLeftShadow={showLeftShadow}
        showRightShadow={showRightShadow}
      >
        <Styles.TabsContainer
          className="tabs-container"
          ref={tabsRef}
          // onScroll={handleScroll}
        >
          {items.map((item, i) => (
            <Styles.TabContainer
              key={i}
              ref={item?.id === activeTab ? activeTabRef : null}
              active={item?.id === activeTab}
              onClick={(e) => {
                e.stopPropagation();
                !item?.isDisabled && onChangeTab(item?.id);
              }}
              isDisabled={item?.isDisabled}
              variant={variant}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              theme={theme}
              className={`tab-title-container ${
                items?.length > 3 ? "w-full" : ""
              }`}
            >
              <Styles.Title 
              active={item?.id === activeTab}> {item?.customTitle || item?.title}</Styles.Title>
            </Styles.TabContainer>
          ))}
        </Styles.TabsContainer>
        <Styles.TabUnderline
          activeColor={activeColor}
          style={{ left: `${underlineLeft}px`, width: `${activeTabWidth}px` }}
        ></Styles.TabUnderline>
        {/* {hasOverflow && (
          <Styles.Ellipsis
            variant={variant}
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            ...
          </Styles.Ellipsis>
        )} */}

        {/* <Styles.MenuWrapper
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          isMenuOpen={isMenuOpen}
        >
          {menuItems.map((item, index) => (
            <Styles.MenuItem
              key={index}
              onClick={() => {
                setIsMenuOpen(false);
                setActiveTab(item.id);
              }}
              active={item?.id === activeTab}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              theme={theme}
            >
              {item?.title}
            </Styles.MenuItem>
          ))}
        </Styles.MenuWrapper> */}
      </Styles.TabsWrapper>
      {/* {variant !== "underline" && <Styles.HorizontalLine />} */}
      {isContent && (
        <Styles.TabContent
          className="tabs-asmtabs-tab-content"
          variant={variant}
        >
          {items.length > 0 && items[activeTab]?.content}
        </Styles.TabContent>
      )}
    </Styles.Container>
  );
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
      content: PropTypes.oneOfType([PropTypes.node || PropTypes.string])
        .isRequired,
      isDisabled: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(["underline", "card"]),
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  isContent: PropTypes.bool,
  activeTabWidthProp: PropTypes.number,
};

Tabs.defaultProps = {
  variant: "underline",
  onChange: () => {},
  isContent: false,
  activeTabWidthProp: null,
};

export default Tabs;
