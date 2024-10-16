import React from "react";
import ThirdLayout from "./ThirdLayout";
import styled from "styled-components";
import SecondLayout from "./Second/SecondLayout";
import FirstLayout from "./FIrst/overviewfirstlayout/FirstLayout";
import { useGlobalData } from "../../hooks/GlobalContext";

const LayoutViewer = () => {
  const { sideBarClickedData } = useGlobalData();

  //console.log("sidebarClickedData", sideBarClickedData);
  const { name } = sideBarClickedData;

  // Labour Dietary Content      Food security challenges in children

  return (
    <Wrapper>
      {(name == "Labour" ||
        name == "Consumer Prices" ||
        name == "Food security challenges in  adults") && <FirstLayout />}

      {(name == "Dietary Content" ||
        name == "Overview" ||
        name == "Gross Production Value" ||
        name == "Production indices") && <ThirdLayout />}

      {(name == "Yield" ||
        name == "Investments" ||
        name == "Agriculture emissions") && <SecondLayout />}

      {(name == "Food security challenges in children" ||
        name == "Trade indices" ||
        name == "Food Balances") && <SecondLayout />}
    </Wrapper>
  );
};

export default LayoutViewer;

const Wrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
`;
