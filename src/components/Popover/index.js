import React, { useEffect, useRef, useState } from "react";
import * as Styles from "./index.sc";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Close } from "../../assets/icons";

const Popover = ({
  title,
  content,
  placement,
  trigger,
  styles,
  spacing,
  children,
  showCloseIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [childDimension, setChildDimension] = useState({ height: 0, width: 0 });
  const [popoverDimension, setPopoverDimension] = useState({
    height: 0,
    width: 0,
  });
  const childRef = useRef(null);
  const popoverRef = useRef(null);
  const [render, setRender] = useState(false);
  const [newPlacement, setNewPlacement] = useState(placement);

  const handleDocumentClick = (event) => {
    event.stopPropagation();
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      childRef.current &&
      !childRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const arrowStyle = {};

  const popoverStyle = {};
  useEffect(() => {
    if (childRef.current) {
      const { top, left, bottom, x, y, width, height } =
        childRef.current.getBoundingClientRect();
      setChildDimension({
        height: height,
        width: width,
        top: top,
        left: left,
        x: x,
        y: y,
      });
    }
    if (popoverRef.current) {
      const rect = popoverRef.current;
      setPopoverDimension({
        height: rect.offsetHeight,
        width: rect.offsetWidth,
      });
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen, render]);

  switch (newPlacement) {
    case "top":
      popoverStyle.top = `${
        childDimension.top - spacing - popoverDimension.height
      }px`;

      popoverStyle.left = `${
        childDimension.left -
        popoverDimension.width / 2 +
        childDimension.width / 2
      }px`;
      popoverStyle.transformOrigin = "bottom center";
      arrowStyle.bottom = "-4px";
      arrowStyle.left = `${popoverDimension.width / 2 - 5}px `;
      break;

    case "topLeft":
      popoverStyle.top = `${
        childDimension.top - spacing - popoverDimension.height
      }px`;
      popoverStyle.left = `${childDimension.left - 10}px`;

      popoverStyle.transformOrigin = "bottom left";
      arrowStyle.bottom = "-4px";
      arrowStyle.left = `15px `;
      break;
    case "leftTop":
      popoverStyle.top = `${childDimension.top - 10}px`;
      popoverStyle.left = `${
        childDimension.left - popoverDimension.width - spacing
      }px`;

      popoverStyle.transformOrigin = "top right";
      arrowStyle.top = "15px";
      arrowStyle.right = `-4px `;
      break;

    case "topRight":
      popoverStyle.top = `${
        childDimension.top - spacing - popoverDimension.height
      }px`;
      popoverStyle.left = `${
        childDimension.left - popoverDimension.width + childDimension.width + 10
      }px`;

      popoverStyle.transformOrigin = "bottom right";
      arrowStyle.bottom = "-4px";
      arrowStyle.right = `15px`;
      break;

    case "rightTop":
      popoverStyle.top = `${childDimension.top - 10}px`;
      popoverStyle.left = `${
        childDimension.left + childDimension.width + spacing
      }px`;

      popoverStyle.transformOrigin = "top left";
      arrowStyle.top = "15px";
      arrowStyle.left = `-4px `;
      break;

    case "bottom":
      popoverStyle.top = `${
        childDimension.top + spacing + childDimension.height
      }px`;

      popoverStyle.left = `${
        childDimension.left -
        popoverDimension.width / 2 +
        childDimension.width / 2
      }px`;
      popoverStyle.transformOrigin = "top center";

      arrowStyle.top = "-4px";
      arrowStyle.left = `${popoverDimension.width / 2 - 5}px `;
      break;

    case "bottomLeft":
      popoverStyle.top = `${
        childDimension.top + spacing + childDimension.height
      }px`;
      popoverStyle.left = `${childDimension.left - 10}px`;

      popoverStyle.transformOrigin = "top left";
      arrowStyle.top = "-4px";
      arrowStyle.left = `15px`;
      break;

    case "leftBottom":
      popoverStyle.top = `${
        childDimension.top +
        10 -
        popoverDimension.height +
        childDimension.height
      }px`;
      popoverStyle.left = `${
        childDimension.left - popoverDimension.width - spacing
      }px`;

      popoverStyle.transformOrigin = "bottom right";
      arrowStyle.bottom = "15px";
      arrowStyle.right = `-4px `;
      break;

    case "bottomRight":
      popoverStyle.top = `${
        childDimension.top + spacing + childDimension.height
      }px`;
      popoverStyle.right = `${
        window.innerWidth -
        (childDimension.left + childDimension.width + spacing + 5)
      }px`;

      popoverStyle.transformOrigin = "top right";
      arrowStyle.top = "-6px";
      arrowStyle.right = `15px`;
      break;

    case "rightBottom":
      popoverStyle.top = `${
        childDimension.top +
        10 -
        popoverDimension.height +
        childDimension.height
      }px`;
      popoverStyle.left = `${
        childDimension.left + childDimension.width + spacing
      }px`;

      popoverStyle.transformOrigin = "bottom left";
      arrowStyle.bottom = "15px";
      arrowStyle.left = `-4px `;
      break;

    case "left":
      popoverStyle.top = `${
        childDimension.top -
        popoverDimension.height / 2 +
        childDimension.height / 2
      }px`;
      popoverStyle.left = `${
        childDimension.left - popoverDimension.width - spacing
      }px`;

      popoverStyle.transformOrigin = "center right";
      arrowStyle.top = `${popoverDimension.height / 2 - 5}px `;
      arrowStyle.right = "-4px";
      break;

    case "right":
      popoverStyle.top = `${
        childDimension.top -
        popoverDimension.height / 2 +
        childDimension.height / 2
      }px`;
      popoverStyle.left = `${
        childDimension.left + childDimension.width + spacing
      }px`;
      popoverStyle.transformOrigin = "center left";
      arrowStyle.top = `${popoverDimension.height / 2 - 5}px`;
      arrowStyle.left = "-4px";
      break;

    default:
      popoverStyle.bottom = `${childDimension.height + spacing}px`;

      popoverStyle.left = `-${
        popoverDimension.width / 2 - childDimension.width / 2
      }px`;
      popoverStyle.transformOrigin = "bottom center";
      arrowStyle.bottom = "-4px";
      arrowStyle.left = `${popoverDimension.width / 2 - 5}px `;
      break;
  }

  useEffect(() => {
    const handleScroll = () => {
      setRender((p) => !p); // for scrolling when value changes the useEffect will trigger a scroll.
    };

    let parent = childRef.current.parentNode;

    while (parent && parent !== document) {
      parent.addEventListener("scroll", handleScroll);
      parent = parent.parentNode;
    }

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Cleanup function to remove the event listeners
    return () => {
      let parent = childRef?.current?.parentNode;

      while (parent && parent !== document) {
        parent.removeEventListener("scroll", handleScroll);
        parent = parent.parentNode;
      }

      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const topCrossed = childDimension.top - popoverDimension.height - 15 < 0;
    const bottomCrossed =
      childDimension.top +
        childDimension.height +
        popoverDimension.height +
        15 >
      window.innerHeight;
    const leftCrossed = childDimension.left - popoverDimension.width - 15 < 0;
    const rightCrossed =
      childDimension.left + childDimension.width + popoverDimension.width + 15 >
      window.innerWidth;

    if (bottomCrossed) {
      newPlacement == "bottom" && setNewPlacement("top");
      newPlacement == "bottomLeft" && setNewPlacement("topLeft");
      newPlacement == "bottomRight" && setNewPlacement("topRight");
    } else if (topCrossed) {
      placement == "top" && setNewPlacement("bottom");
      newPlacement == "topLeft" && setNewPlacement("bottomLeft");
      newPlacement == "topRight" && setNewPlacement("bottomRight");
    } else if (leftCrossed) {
      newPlacement == "left" && setNewPlacement("right");
      newPlacement == "leftBottom" && setNewPlacement("rightBottom");
      newPlacement == "leftTop" && setNewPlacement("rightTop");
    } else if (rightCrossed) {
      newPlacement == "right" && setNewPlacement("left");
      newPlacement == "rightBottom" && setNewPlacement("leftBottom");
      newPlacement == "rightTop" && setNewPlacement("leftTop");
    }

    return () => setNewPlacement(placement); // when space is there then its align its original position
  }, [childDimension, popoverDimension, isOpen, render]);

  return (
    <Styles.PopoverWrapper className="popover-asmpopovr">
      <Styles.Child
        onClick={() => trigger === "click" && setIsOpen(!isOpen)}
        onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
        onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
        onFocus={() => trigger === "focus" && setIsOpen(true)}
        onBlur={() => trigger === "focus" && setIsOpen(false)}
        ref={childRef}
      >
        {children}
      </Styles.Child>
      {ReactDOM.createPortal(
        <Styles.PopoverContainer
          style={popoverStyle}
          arrowStyle={arrowStyle}
          ref={popoverRef}
          isOpen={isOpen}
          styles={styles}
        >
          {showCloseIcon && (
            <Styles.CloseIconWrapper onClick={() => setIsOpen(false)}>
              <Close size={16} color={"#141630"} />
            </Styles.CloseIconWrapper>
          )}
          {title && <Styles.Title styles={styles}>{title}</Styles.Title>}
          <Styles.Content styles={styles}>{content}</Styles.Content>
        </Styles.PopoverContainer>,
        document.body
      )}
    </Styles.PopoverWrapper>
  );
};

Popover.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placement: PropTypes.oneOf([
    "top",
    "topLeft",
    "leftTop",
    "topRight",
    "rightTop",
    "bottom",
    "bottomLeft",
    "leftBottom",
    "bottomRight",
    "rightBottom",
    "left",
    "right",
  ]),
  trigger: PropTypes.oneOf(["click", "hover", "focus"]),
  styles: PropTypes.object,
  spacing: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Popover.defaultProps = {
  placement: "top",
  trigger: "click",
  spacing: 15,
};

export default Popover;

function Portal({ children }) {
  const el = document.createElement("div");

  useEffect(() => {
    if (el) {
      document.body.appendChild(el);
      return () => document.body.removeChild(el);
    }
  }, [el]);

  return ReactDOM.createPortal(children, el);
}
