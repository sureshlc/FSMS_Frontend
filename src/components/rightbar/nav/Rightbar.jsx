import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import Dropdown from "../../Dropdown";
import { useTheme } from "../../../hooks/Theme";
// import { ReactComponent as Profile } from "../assets/profilelogo.svg";
import { ReactComponent as Profile } from "../../../assets/imgs/profilelogo.svg";
import SyriaFlag from "../../../assets/icons/components/flags/Syria";
import EgyptFlag from "../../../assets/icons/components/flags/Egypt.js";
import IraqFlag from "../../../assets/icons/components/flags/Iraq.js";
import JordanFlag from "../../../assets/icons/components/flags/Jordan.js";
import LebanonFlag from "../../../assets/icons/components/flags/Lebanon.js";
import PalestineFlag from "../../../assets/icons/components/flags/Palestine.js";
import MASHFlag from "../../../assets/icons/components/flags/Mash.js";
import { ReactComponent as ClockLogo } from "../../../assets/imgs/Clock.svg";
import { useGlobalData } from "../../../hooks/GlobalContext";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  Filter,
  FilterTitle,
  Item,
  Left,
  LeftBottom,
  LeftTop,
  LogoContainer,
  Mainwrapper,
  Right,
  TimeStampContainer,
  Title,
  TitleContainer,
  HeaderContainer,
  HeadingContainer,
  // HeaderContainer,
  HeadingData,
  CustomComponent,
  Wrapper,
  CountryRank,
  NotificationWrapper,
  NotificationDot,
  LogoutContainer,
} from "./index.sc";
import { useLocation, useNavigate } from "react-router";
import { Bell, Menuicon } from "../../../assets/icons";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../../assets/imgs/image 3.svg";
import NewDropdown from "../../new-dropdown";
import Searchicon from "../../../assets/icons/components/Searchicon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAlertNotifications,
  getCountryData,
  getCountryRank,
  getLastUpdated,
} from "../../../services";
import { sidebarMockData } from "../../../mock-data/sidebar";
import WorldIcon from "../../../assets/icons/components/WorldIcon";
import BellIcon from "../../../assets/icons/components/BellIcon";
import Popover from "../../Popover";
import Alert from "../../Alert";
import BellIcon2 from "../../../assets/icons/components/BellIcon2";
import { getUser, removeUser } from "../../../utils/user";
import LogoutIcon from "../../../assets/icons/components/Logout";
import {
  gifMapping,
  iconMapping,
} from "../../../constants/sideBarIconssMapping";

const firstCountryOption = {
  label: "All Mashreq Countries",
  value: "All Mashreq Countries",
  iso3_code: "",
  latitude: "",
  longitude: "",
};

const Rightbar = ({ isRecentCollapsed, toggleCategoryList = () => {} }) => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const queryParams = useQueryParams();

  const [clockHovered, setClockHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  const { countryFilter = "", countryId = "" } =
    queryParams.getAllQueryParams();
  const queryClient = useQueryClient();
  let countryName = countryFilter.split("-")[0];
  const categoryUrl = pathname.substring(1);
  const alertCountryKey =
    countryName === "All Mashreq Countries" ? "" : countryName;
  const alertCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === (categoryUrl === "Overview" ? "" : categoryUrl)
  )?.value;

  const isoFlagMapping = {
    SYR: <SyriaFlag />,
    EGY: <EgyptFlag />,
    IRQ: <IraqFlag />,
    JOR: <JordanFlag />,
    LBN: <LebanonFlag />,
    PSE: <PalestineFlag />,
    MASH: <MASHFlag />,
  };

  const [showAlert, setShowAlert] = useState(true);
  const AlertRef = useRef();

  const currentCountry = queryParams
    .getQueryParam("countryFilter")
    ?.split("-")[0];

  const currentCategory = sidebarMockData.find(
    (ele) => ele?.endpoint === pathname.substring(1)
  )?.value;

  //get alert data
  const { data: alertNotificationData = [] } = useQuery({
    queryKey: ["alertNotificationData", alertCountryKey, alertCategory],
    queryFn: () => getAlertNotifications(alertCountryKey, alertCategory),
    select: (response) => {
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  // get lastupdated
  const { data: lastUpdatedData } = useQuery({
    queryKey: ["lastUpdated"],
    queryFn: () => getLastUpdated(),
    select: (response) => {
      return response?.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  // get countryRank
  const { data: countryRankData } = useQuery({
    queryKey: ["countryRank", currentCategory, currentCountry],
    queryFn: () =>
      getCountryRank({ category: currentCategory, area: currentCountry }),
    select: (response) => {
      const res = response?.data?.data;
      const rank = res[0]?.data[0]?.rank;
      return rank || "";
    },
    enabled: currentCategory !== "overview",
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // get countryList
  const { data: countryData = [], refetch } = useQuery({
    queryKey: ["countryList"],
    queryFn: () => getCountryData(),
    select: (response) => {
      const res = response?.data?.data || [];
      const finalRes = res.map((ele) => {
        return {
          label: ele?.area,
          value: ele?.area,
          iso3_code: ele["iso3_code"],
          latitude: ele["latitude"],
          longitude: ele["longitude"],
        };
      });
      if (pathname.substring(1) === "Overview") {
        finalRes.unshift(firstCountryOption);
      }
      return finalRes;
    },
    refetchOnWindowFocus: false,
  });

  const handleOptionChange = (filterName, filterValue) => {
    if (filterValue.label !== "All Mashreq Countries") {
      queryParams.setQueryParam(filterName, `${filterValue.label}`);
      queryParams.setQueryParam("countryId", `${filterValue.iso3_code}`);
      queryClient.invalidateQueries({
        queryKey: ["alertData", false, filterValue.label],
      });
    } else {
      queryParams.setQueryParam(filterName, `${filterValue.label}`);
      queryParams.deleteQueryParam("countryId");
      queryClient.invalidateQueries({ queryKey: ["alertData", true, null] });
    }
  };

  const notiClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating
    setShowAlert(!showAlert);
  };

  const internalClick = () => {
    setShowAlert(!showAlert);
  };

  useEffect(() => {
    if (countryData?.length > 0 && user) {
      if (countryId) {
        countryFilter &&
          queryParams.setQueryParam("countryFilter", countryFilter);
        countryId && queryParams.setQueryParam("countryId", countryId);
      } else {
        const firstOption = countryData[0];
        if (firstOption.label === "All Mashreq Countries") {
          queryParams.setQueryParam("countryFilter", `${firstOption.label}`);
          queryParams.deleteQueryParam("countryId");
        } else {
          queryParams.setQueryParam(
            "countryFilter",
            `${firstOption.label}-${firstOption.latitude},${firstOption.longitude}`
          );
          queryParams.setQueryParam("countryId", `${firstOption.iso3_code}`);
        }
      }
    }
  }, [countryData]);

  useEffect(() => {
    refetch();
  }, [pathname]);
  const curentdata = countryData?.find(
    (country) => country?.label === currentCountry
  );

  useEffect(() => {
    // Function to handle click outside the div
    const handleClickOutside = (event) => {
      if (AlertRef.current && !AlertRef.current.contains(event.target)) {
        setShowAlert(true); // Set to true to show the alert
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickLogo = () => {
    navigate("/Overview?countryFilter=All+Mashreq+Countries");
  };

  const handleLogout = () => {
    removeUser();
    navigate("/login");
  };
  const user = getUser();
  if (!user) return;

  return (
    <>
      <Mainwrapper className={isRecentCollapsed ? "collapsed" : ""}>
        <Header onClick={handleClickLogo}>
          <Logoicon>
            {/* <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}> */}
            <LogoIcon />
            {/* </Link> */}
          </Logoicon>
          {/* <LogoWrap> */}
          {/* <Link
              to={"/Overview"}
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
          {/* <Heading>Food and Agriculture Organization</Heading> */}
          {/* </Link> */}
          {/* </LogoWrap> */}
        </Header>
        <TopBarWrapper>
          <Wrapper>
            <HeadingContainer>
              <TitleContainer>
                <HeaderContainer>
                  <HeadingData>
                    <DropdownWrapper>
                      <NewDropdown
                        title="Country"
                        name="countryFilter"
                        newWidth="11"
                        dropdownListHeight={"15"}
                        options={countryData}
                        value={currentCountry} //
                        handleSelectFilter={handleOptionChange}
                        icon={
                          curentdata?.iso3_code ? (
                            isoFlagMapping[curentdata?.iso3_code]
                          ) : (
                            <WorldIcon />
                          )
                        }
                        borderWidth="0"
                      />
                    </DropdownWrapper>
                    {/* <Title>{pathname.substring(1)}</Title> */}
                    {/* <CountryRank>{countryRankData}</CountryRank> */}
                  </HeadingData>
                </HeaderContainer>
              </TitleContainer>
            </HeadingContainer>
          </Wrapper>
          <LogoContainer>
            {/* <CustomComponent>
          <span className="year">2020/21</span> <span>(3 year average)</span>
        </CustomComponent> */}
            <TimeStampContainer>
              <NotificationWrapper onClick={(event) => notiClick(event)}>
                {/* <NotificationDot /> */}
                {alertNotificationData?.length > 0 ? <BellIcon2 /> : <Bell />}
              </NotificationWrapper>
              <Left>
                <LeftTop>Last updated</LeftTop>
                <LeftBottom>
                  {lastUpdatedData?.date} | {lastUpdatedData?.time}
                </LeftBottom>
              </Left>
              <Right>
                <img
                  width={30}
                  height={30}
                  src={
                    clockHovered ? gifMapping["clock"] : iconMapping["clock"]
                  }
                  alt="clock"
                  onMouseOver={() => setClockHovered(true)}
                  onMouseOut={() => setClockHovered(false)}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <LogoutContainer onClick={handleLogout}>
                  <img
                    width={30}
                    height={30}
                    src={iconMapping["logout"]}
                    alt="logout"
                    onMouseOver={() => setLogoutHovered(true)}
                    onMouseOut={() => setLogoutHovered(false)}
                  />
                </LogoutContainer>
              </Right>
            </TimeStampContainer>
            {/* <Profile /> */}
          </LogoContainer>
        </TopBarWrapper>
      </Mainwrapper>
      <AlertWrpr hide={showAlert} ref={AlertRef}>
        <Alert
          alertNotificationData={alertNotificationData}
          click={internalClick}
        />
      </AlertWrpr>
    </>
  );
};

export default Rightbar;

const DropdownWrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  background: #4ac4f6;
`;

const Header = styled.div`
  background: #ffffff;
  display: flex;
  width: 16rem;
  height: 100%;
  align-items: center;
  gap: 1rem;
  padding-left: 1.5rem;
  padding-top: 1.25rem;
  cursor: pointer;
`;
const Iconwrap = styled.div`
  cursor: pointer;
  &.reversed {
    transform: rotate(180deg);
  }
`;
const Logoicon = styled.div`
  position: relative;
`;
const LogoWrap = styled.div`
  display: flex;
  /* width: 9.5rem; */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  &.collapsed {
    opacity: 0;
    transition: all 0.5 fade-in;
  }
  &.hovered {
    opacity: 1;
    transition: all 0.5 fade-out;
  }
`;
const Heading = styled.div`
  /* width: 9.25rem;
  height: 2rem;
  font-family: Archivo; */
  color: #009edb;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  text-align: left;
`;

const AlertWrpr = styled.div`
  height: calc(100vh - 3.5rem);
  width: 24rem;
  position: absolute;
  z-index: 99999;
  margin-top: 3.5rem;
  background-color: #fff;
  right: ${(props) => (props.hide === true ? "-25rem" : "0")};
  box-shadow: 0px 9px 20px 0px rgba(0, 0, 0, 0.25);
  transition: right 0.3s ease;
`;

const TopBarWrapper = styled.div`
  height: 100%;
  width: calc(100% - 16rem);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
