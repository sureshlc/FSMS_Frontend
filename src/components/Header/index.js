import React, { forwardRef } from "react";
import {
  CountryFlagWrapper,
  CountryName,
  HorizontalWrapper,
  SubLabel,
  Title,
  Wrapper,
} from "./index.sc";

import SyriaFlag from "../../assets/icons/components/flags/Syria.js";
import EgyptFlag from "../../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../../assets/icons/components/flags/Mash.js";
import InfoIcon from "../../assets/icons/components/InfoIcon.js";
import Popover from "../Popover";
import HeaderIcon from "../../assets/icons/components/HeaderIcon";

const Header = forwardRef(
  (
    {
      title,
      enableIcon = false,
      iconColor = "#A581E6",
      secondaryTitle,
      subLabel,
      countryIsoCode,
      info,
      additionalClass = "",
      iconFill,
    },

    ref
  ) => {
    const isoFlagMapping = {
      SYR: <SyriaFlag />,
      EGY: <EgyptFlag />,
      IRQ: <IraqFlag />,
      JOR: <JordanFlag />,
      LBN: <LebanonFlag />,
      PSE: <PalestineFlag />,
      MASH: <MASHFlag fill={iconFill} />,
    };

    return (
      <Wrapper ref={ref} className={additionalClass}>
        <HorizontalWrapper hasSubLabel={subLabel} className={additionalClass}>
          <Title className={additionalClass + " " + "header-title"}>
            {enableIcon && <HeaderIcon fill={iconColor} />}

            {title}
            {secondaryTitle && <span>({secondaryTitle})</span>}
          </Title>
          {countryIsoCode && (
            <CountryFlagWrapper className= {`country-flag-wrapper ${additionalClass}`}>
              {info && (
                <Popover
                  content={info}
                  placement="bottomRight"
                  spacing={10}
                  styles={{
                    border: "1px solid #009EDB",
                  }}
                  trigger="hover"
                >
                  <InfoIcon size="14" />
                </Popover>
              )}
              <CountryName
                className={`country-code ${countryIsoCode === "MASH" && "MASH"
                  }`}
              >
                {countryIsoCode}
              </CountryName>
              {isoFlagMapping[countryIsoCode]}
            </CountryFlagWrapper>
          )}
        </HorizontalWrapper>
        <SubLabel>{subLabel}</SubLabel>
      </Wrapper>
    );
  }
);

export default Header;
