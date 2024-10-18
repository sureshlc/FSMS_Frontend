import React from "react";
import { SwitchToDesktopView, SwitchToDesktopViewText } from "./index.sc";

const MobileView = (props) => {
  return (
    <SwitchToDesktopView>
      <SwitchToDesktopViewText>Switch to desktop view!</SwitchToDesktopViewText>
    </SwitchToDesktopView>
  );
};

MobileView.propTypes = {};

export default MobileView;
