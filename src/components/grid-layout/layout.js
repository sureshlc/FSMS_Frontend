/* eslint-disable react/self-closing-comp */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { StyleSheetManager } from "styled-components";

import { GridLayout } from "./style";

const Layout = ({
  layoutTheme,
  widgets,
  rowHeight,
  layoutThemeMobile,
  layoutThemeSemiLarge,
  cols,
}) => {
  const targetNode = useRef(null);
  const [hasMounted, setHasMounted] = useState();
  useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);
  return (
    <>
      <div style={{ display: "none", zIndex: "-1" }} ref={targetNode}></div>
      {hasMounted && (
        <StyleSheetManager target={targetNode.current}>
          <GridLayout
            rowHeight={rowHeight}
            layoutThemeMobile={layoutThemeMobile}
            layoutTheme={layoutTheme}
            layoutThemeSemiLarge={layoutThemeSemiLarge}
            widgets={widgets}
            cols={cols}
            className="gridLayout"
          >
            {widgets.map((item, i) => (
              <div
                key={i}
                data-col={i}
                className={`${item.className} activator ${
                  item.additionalClass || ""
                }`}
                style={{
                  gridArea: item.className,
                  transform: item.ending
                    ? `translateY(${item.ending * 30}px)`
                    : "",
                  // opacity: 0,
                  // transition: "transform 500ms, opacity 500ms ease",
                }}
              >
                {item.widget}
              </div>
            ))}
          </GridLayout>
        </StyleSheetManager>
      )}
    </>
  );
};

Layout.propTypes = {
  layoutTheme: PropTypes.array.isRequired,
  widgets: PropTypes.array.isRequired,
  layoutThemeMobile: PropTypes.array.isRequired,
  layoutThemeSemiLarge: PropTypes.array.isRequired,
  rowHeight: PropTypes.string,
  cols: PropTypes.string,
  handleSelectWidget: PropTypes.func,
};

Layout.defaultProps = {
  rowHeight: "15",
  cols: "4",
  handleSelectWidget: () => {},
};

export default Layout;
