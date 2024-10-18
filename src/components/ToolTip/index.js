import React, { useEffect, useRef, useState } from "react";
import * as Styles from "./index.sc";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

const Tooltip = ({ content, placement, variant, zIndex, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPlacement, setNewPlacement] = useState(placement);
  const [childDimension, setChildDimension] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });
  const [tooltipDimension, setTooltipDimension] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });
  const childRef = useRef(null);
  const tooltipRef = useRef(null);

  const [render, setRender] = useState(false);

  const tooltipStyles = {
    top: {
      tooltipStyle: {
        top: `${childDimension.top - 15 - tooltipDimension.height}px`,
        left: `${
          childDimension.left -
          tooltipDimension.width / 2 +
          childDimension.width / 2
        }px`,
        transformOrigin: "bottom center",
      },
      arrowStyle: {
        bottom: "-4px",
        left: `${tooltipDimension.width / 2 - 5}px`,
      },
    },
    topLeft: {
      tooltipStyle: {
        top: `${childDimension.top - 15 - tooltipDimension.height}px`,
        left: `${childDimension.left - 10}px`,
        transformOrigin: "bottom left",
      },
      arrowStyle: {
        bottom: "-4px",
        left: "15px",
      },
    },
    leftTop: {
      tooltipStyle: {
        top: `${childDimension.top - 10}px`,
        left: `${childDimension.left - tooltipDimension.width - 15}px`,
        transformOrigin: "top right",
      },
      arrowStyle: {
        top: "15px",
        right: "-4px",
      },
    },
    topRight: {
      tooltipStyle: {
        top: `${childDimension.top - 15 - tooltipDimension.height}px`,
        left: `${
          childDimension.left -
          tooltipDimension.width +
          childDimension.width +
          10
        }px`,
        transformOrigin: "bottom right",
      },
      arrowStyle: {
        bottom: "-4px",
        right: "15px",
      },
    },
    rightTop: {
      tooltipStyle: {
        top: `${childDimension.top - 10}px`,
        left: `${childDimension.left + childDimension.width + 15}px`,
        transformOrigin: "top left",
      },
      arrowStyle: {
        top: "15px",
        left: "-4px",
      },
    },
    bottom: {
      tooltipStyle: {
        top: `${childDimension.top + 15 + childDimension.height}px`,
        left: `${
          childDimension.left -
          tooltipDimension.width / 2 +
          childDimension.width / 2
        }px`,
        transformOrigin: "top center",
      },
      arrowStyle: {
        left: `${tooltipDimension.width / 2 - 5}px`,
        top: "-4px",
      },
    },
    bottomLeft: {
      tooltipStyle: {
        top: `${childDimension.top + 15 + childDimension.height}px`,
        left: `${childDimension.left - 10}px`,
        transformOrigin: "top left",
      },
      arrowStyle: {
        top: "-4px",
        left: "15px",
      },
    },
    leftBottom: {
      tooltipStyle: {
        top: `${
          childDimension.top +
          10 -
          tooltipDimension.height +
          childDimension.height
        }px`,
        left: `${childDimension.left - tooltipDimension.width - 15}px`,
        transformOrigin: "bottom right",
      },
      arrowStyle: {
        bottom: "15px",
        right: "-4px",
      },
    },
    bottomRight: {
      tooltipStyle: {
        top: `${childDimension.top + 15 + childDimension.height}px`,
        left: `${
          childDimension.left -
          tooltipDimension.width +
          childDimension.width +
          10
        }px`,
        transformOrigin: "top right",
      },
      arrowStyle: {
        top: "-4px",
        right: "15px",
      },
    },
    rightBottom: {
      tooltipStyle: {
        top: `${
          childDimension.top +
          10 -
          tooltipDimension.height +
          childDimension.height
        }px`,
        left: `${childDimension.left + childDimension.width + 15}px`,
        transformOrigin: "bottom left",
      },
      arrowStyle: {
        bottom: "15px",
        left: "-4px",
      },
    },
    left: {
      tooltipStyle: {
        top: `${
          childDimension.top -
          tooltipDimension.height / 2 +
          childDimension.height / 2
        }px`,
        left: `${childDimension.left - tooltipDimension.width - 15}px`,
        transformOrigin: "center right",
      },
      arrowStyle: {
        top: `${tooltipDimension.height / 2 - 5}px`,
        right: "-4px",
      },
    },
    right: {
      tooltipStyle: {
        top: `${
          childDimension.top -
          tooltipDimension.height / 2 +
          childDimension.height / 2
        }px`,
        left: `${childDimension.left + childDimension.width + 15}px`,
        transformOrigin: "center left",
      },
      arrowStyle: {
        top: `${tooltipDimension.height / 2 - 5}px`,
        left: "-4px",
      },
    },
    default: {
      tooltipStyle: {
        bottom: `${childDimension.height + 15}px`,
        left: `-${tooltipDimension.width / 2 - childDimension.width / 2}px`,
        transformOrigin: "bottom center",
      },
      arrowStyle: {
        bottom: "-6px",
        left: `${tooltipDimension.width / 2 - 5}px`,
      },
    },
  };

  const placementStyles = tooltipStyles[newPlacement] || tooltipStyles.default;
  const { tooltipStyle, arrowStyle } = placementStyles;

  useEffect(() => {
    if (childRef.current) {
      const { top, left, x, y, width, height } =
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
    if (tooltipRef.current) {
      const rect = tooltipRef.current;
      setTooltipDimension({
        height: rect.offsetHeight,
        width: rect.offsetWidth,
      });
    }
  }, [isOpen, render]);

  useEffect(() => {
    const handleScroll = () => {
      setRender((p) => !p); // will render the component when scrolling occured and useEffect will trigger and fixed the positioning of the tooltip
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
    const handleWindowResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const topCrossed = childDimension.top - tooltipDimension.height - 15 < 0;
    const bottomCrossed =
      childDimension.top +
        childDimension.height +
        tooltipDimension.height +
        15 >
      window.innerHeight;
    const leftCrossed = childDimension.left - tooltipDimension.width - 15 < 0;
    const rightCrossed =
      childDimension.left + childDimension.width + tooltipDimension.width + 15 >
      window.innerWidth;

    if (bottomCrossed) {
      setNewPlacement("top");
    } else if (bottomCrossed && leftCrossed) {
      setNewPlacement("right");
    } else if (bottomCrossed && rightCrossed) {
      setNewPlacement("left");
    } else if (topCrossed && leftCrossed) {
      setNewPlacement("right");
    } else if (topCrossed && rightCrossed) {
      setNewPlacement("left");
    } else if (rightCrossed) {
      setNewPlacement("left");
    } else if (topCrossed) {
      setNewPlacement("bottom");
    } else if (placement !== "top" && placement !== "bottom" && leftCrossed) {
      setNewPlacement("right");
    } else if (placement !== "top" && placement !== "bottom" && rightCrossed) {
      setNewPlacement("left");
    } else {
      setNewPlacement(placement);
    }
  }, [childDimension, tooltipDimension, isOpen]);

  return (
    <Styles.TooltipWrapper zIndex={zIndex} className="tooltip-asmtooltip">
      <Styles.Child
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        ref={childRef}
      >
        {children}
      </Styles.Child>
      {ReactDOM.createPortal(
        <Styles.TooltipContainer
          toolTipStyle={tooltipStyle}
          arrowStyle={arrowStyle}
          ref={tooltipRef}
          isOpen={isOpen}
          variant={variant}
        >
          <Styles.Content variant={variant}>{content}</Styles.Content>
        </Styles.TooltipContainer>,
        document.body
      )}
    </Styles.TooltipWrapper>
  );
};

Tooltip.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
  variant: PropTypes.oneOf(["light", "dark"]),
  zIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Tooltip.defaultProps = {
  placement: "top",
  zIndex: 1000,
  variant: "dark",
};

export default Tooltip;
