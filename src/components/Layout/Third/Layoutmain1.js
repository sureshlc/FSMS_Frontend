import React, { useState, useEffect } from "react";
import Boxl1 from "./Boxl1";
import Boxl2 from "./Boxl2";
import Boxl3 from "./Boxl3";
function Layoutmain1({ expanded, reduced ,expand,box}) {
  const [isScreenSmallwidth, setIsScreenSmallWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmallWidth(window.innerWidth <= 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (expanded) {
    return <Boxl1  expand={expand} />;
  } else if (reduced || isScreenSmallwidth) {
    return <Boxl2 expand={expand} box={box} />;
  } else{
    return <Boxl3 box={box}/>;
  }
}

export default Layoutmain1;
