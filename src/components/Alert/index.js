import React from "react";
import {
  AlertCard,
  AlertContainer,
  AlertContent,
  AlertHeader,
  BellWrapper,
  ContainerDiv,
  CountryCode,
  CountryDetails,
  CrossCont,
  CrossIconWrpr,
  Date,
  Description,
  ExportCloseContainer,
  NoDataComponent,
  NodataText,
  Title,
} from "./index.sc";
import BellIcon from "../../assets/icons/components/BellIcon";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

// falgs import
import SyriaFlag from "../../assets/icons/components/flags/Syria.js";
import EgyptFlag from "../../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../../assets/icons/components/flags/Mash.js";
import { sidebarMockData } from "../../mock-data/sidebar";

import NoDataIcon from "../../assets/icons/components/NoDataIcon";
import CrossIconAlert from "../../assets/icons/components/crossIconAlert";
import { Button } from "../CustomButton";
import { DownloadIcon } from "../../assets/icons";

const categoryMapping = {
  FOOD_SECURITY: "Food Security",
  PRODUCTION_TRADE: "Production & Trade",
  CONSUMPTION: "Consumption",
  INVESTMENT: "Investment",
  FOOD_PRICE: "Food Price",
  EMISSION: "Emission",
};

const downloadBtnStyle = {
  width: "5.6rem",
  height: "1.6rem",
  border: "1px solid #DADADA !important",
  borderRadius: 0,
  padding: "8px 10px 8px 10px",
  fontFamily: "Inter",
  fontSize: "0.688rem",
  fontWeight: 500,
  lineHeight: "0.563rem",
  letterSpacing: "0em",
  textAlign: "left",
};

const Alert = ({ alertNotificationData = [], click }) => {
  const isoFlagMapping = {
    SYR: <SyriaFlag />,
    EGY: <EgyptFlag />,
    IRQ: <IraqFlag />,
    JOR: <JordanFlag />,
    LBN: <LebanonFlag />,
    PSE: <PalestineFlag />,
    MASH: <MASHFlag />,
  };

  const navigate = useNavigate();

  const onClickNavigation = (ele) => {
    const { category, area, iso3_code } = ele;
    const passingRoute = category.toLowerCase();
    const matchRoute = sidebarMockData.find(
      (item) => item.value === passingRoute
    );
    const matchRouteExtraction = matchRoute.endpoint;
    const passingArea = area.replace(/ /g, "+");
    const newUrl = `/${matchRouteExtraction}?countryFilter=${passingArea}&countryId=${iso3_code}`;
    navigate(newUrl);
  };

  const handleExportAlert = () => {
    if (alertNotificationData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(alertNotificationData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "Alerts.xlsx");
    }
  };

  return (
    <AlertContainer>
      <CrossIconWrpr>
        <AlertHeader>
          Alerts <span> {alertNotificationData?.length} New</span>
        </AlertHeader>
        <ExportCloseContainer>
          {alertNotificationData?.length > 0 && (
            <Button
              title="Download"
              icon={<DownloadIcon />}
              iconPosition="left"
              btnStyle={downloadBtnStyle}
              onClick={handleExportAlert}
            />
          )}
          <CrossCont onClick={() => click()}>
            <CrossIconAlert />
          </CrossCont>
        </ExportCloseContainer>
      </CrossIconWrpr>

      {alertNotificationData?.length === 0 ? (
        <NoDataComponent>
          <NoDataIcon />
          <NodataText>No Alerts</NodataText>
        </NoDataComponent>
      ) : (
        alertNotificationData?.map((ele, i) => (
          <AlertCard key={i}>
            <BellWrapper>
              <BellIcon />
            </BellWrapper>
            <AlertContent>
              <ContainerDiv>
                <Title onClick={() => onClickNavigation(ele)}>
                  {categoryMapping[ele.category]}
                </Title>
                <CountryDetails>
                  <CountryCode>{ele.iso3_code}</CountryCode>
                  {isoFlagMapping[ele.iso3_code]}
                </CountryDetails>
              </ContainerDiv>
              <Date>{`${ele.month}, ${ele.year}`}</Date>
              <Description>{ele.description}</Description>
            </AlertContent>
          </AlertCard>
        ))
      )}
    </AlertContainer>
  );
};

export default Alert;
