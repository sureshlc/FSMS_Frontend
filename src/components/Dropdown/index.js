import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";
import useOnClickOutside from "./hooks/useClickOutside";
import * as Styles from "./index.sc";
import { useTheme } from "../../hooks/Theme";
import { PositionedPortal } from "../Portal/index.js";

const Dropdown = ({
  title,
  renderProp,
  trigger,
  placement,
  disable,
  style,
  value,
  placeholder,
  label,
  isRequired,
  tagName,
  arrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownRef, setDropdownRef] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const containerRef = useRef();
  const theme = useTheme();

  useOnClickOutside(
    dropdownRef,
    () => {
      setIsOpen(false);
    },
    containerRef
  );

  useEffect(() => {
    const handleScroll = () => {
      setPosition(getMenuPosition(placement)); // for scrolling
    };

    let parent = containerRef.current.parentNode;

    while (parent && parent !== document) {
      parent.addEventListener("scroll", handleScroll);
      parent = parent.parentNode;
    }

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Cleanup function to remove the event listeners
    return () => {
      let parent = containerRef?.current?.parentNode;

      while (parent && parent !== document) {
        parent.removeEventListener("scroll", handleScroll);
        parent = parent.parentNode;
      }

      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [position]);

  useEffect(() => {
    if (dropdownRef) {
      const { top, left, bottom, x, y, width, height } =
        containerRef.current.getBoundingClientRect();
      setPosition(getMenuPosition(placement));
    }
  }, [dropdownRef, isOpen]);

  const getMenuPosition = (placement) => {
    const containerRect = containerRef?.current?.getBoundingClientRect();
    if (!containerRect) {
      return { top: 0, left: 0, width: 0 }; // Return a default position or handle the case where containerRef is not yet available
    }

    const { top, left, x, y, width, height } = containerRect;

    //////////////logic to change the placement a/c to the height availablity ////////////////
    var newPlacement = placement;
    const heightDropDown = dropdownRef?.getBoundingClientRect().height;

    const topCrossed = top - heightDropDown - height - 15 < 0;
    const bottomCrossed =
      top + heightDropDown + height + 15 > window.innerHeight;

    if (bottomCrossed) {
      if (placement == "bottom") newPlacement = "top";
      if (placement == "bottomLeft") newPlacement = "topLeft";
      if (placement == "bottomRight") newPlacement = "topRight";
    } else if (topCrossed) {
      if (placement == "top") newPlacement = "bottom";
      if (placement == "topLeft") newPlacement = "bottomLeft";
      if (placement == "topRight") newPlacement = "bottomRight";
    }
    ////////////////////////////////////////////////////////////////////////////////////////

    switch (newPlacement) {
      case "bottom":
        return {
          top: top + height + 10,
          left:
            left + width / 2 - dropdownRef?.getBoundingClientRect().width / 2,
          width,
        };
      case "top":
        return {
          top: y - dropdownRef?.getBoundingClientRect().height - 10,
          left:
            left + width / 2 - dropdownRef?.getBoundingClientRect().width / 2,
          width,
        };
      case "topLeft":
        return {
          top: y - dropdownRef?.getBoundingClientRect().height - 10,
          left: left || 0,
          width,
        };
      case "topRight":
        return {
          top: y - dropdownRef?.getBoundingClientRect().height - 10,
          left: x + width - dropdownRef?.getBoundingClientRect().width,
          width,
        };
      case "bottomLeft":
        return { top: top + height + 10 || 0, left: left || 0, width };
      case "bottomRight":
        return {
          top: top + height + 10 || 0,
          left: x + width - dropdownRef?.getBoundingClientRect().width,
          width,
        };
      default:
        return { top: 0, left: 0, width };
    }
  };

  return (
    <Styles.TopSection className="dropdown-component" test-tag={tagName}>
      {label && (
        <Styles.Label>
          {isRequired && <Styles.Symbol>*</Styles.Symbol>}
          {label}
        </Styles.Label>
      )}
      <Styles.Container
        ref={containerRef}
        color={theme.main}
        open={isOpen}
        style={style}
        disable={disable}
      >
        <Styles.TitleContainer
          disable={disable}
          onClick={() => {
            trigger === "click" && !disable && setIsOpen(!isOpen);
          }}
          onMouseEnter={() => {
            trigger === "hover" && !disable && setIsOpen(true);
          }}
          onMouseLeave={() => {
            trigger === "hover" && !disable && setIsOpen(false);
          }}
          color={isOpen ? theme.main : "#3D5E73"}
        >
          <Styles.Title
            isString={
              typeof value?.title === "string" || typeof title === "string"
            }
            placeholder={title ? false : placeholder ? true : false}
            className="dd-title"
            arrow={arrow}
          >
            {value ? value.title : title ? title : placeholder}
          </Styles.Title>

          {arrow && (
            <ArrowIcon
              className="dropdown-arrow-icon"
              style={{
                transform: isOpen ? `rotate(0deg)` : `rotate(180deg)`,
                transition: "transform 0.3s ease",
              }}
            />
          )}
        </Styles.TitleContainer>
        <PositionedPortal isOpen={isOpen} position={position}>
          <Styles.ItemsContainer ref={setDropdownRef}>
            {/* // clone the list and pass setIsOpen to handle closing of dropdown
  from child */}
            {renderProp(setIsOpen, isOpen)}
          </Styles.ItemsContainer>
        </PositionedPortal>
      </Styles.Container>
    </Styles.TopSection>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.object,
  renderProp: PropTypes.func,
  trigger: PropTypes.string,
  placement: PropTypes.string,
  disable: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  arrow: PropTypes.bool,
};

Dropdown.defaultProps = {
  // props default values
  trigger: "click",
  placement: "bottomLeft",
  disable: false,
};
