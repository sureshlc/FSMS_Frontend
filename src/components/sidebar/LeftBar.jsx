import React, { useState } from "react";
import { useTheme } from "../../hooks/Theme";
import { BarData, EllipsisRefWrapper, Recent, StyledItem } from "./index.sc";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryParams from "../../hooks/useQueryParams";
import { sidebarMockData } from "../../mock-data/sidebar";
import { gifMapping, iconMapping } from "../../constants/sideBarIconssMapping";

const LeftBar = ({ isRecentCollapsed, expandedleft }) => {
  const theme = useTheme();
  const { getQueryParam } = useQueryParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.pathname?.substring(1);
  const countryRes = queryClient.getQueryData(["countryList"]);
  const currentCountry = getQueryParam("countryFilter")?.split("-")[0];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (e, el) => {
    e.preventDefault();
    // setRerender((prev) => prev + 1);
    const countryData = countryRes?.data?.data;
    if (!countryData) {
      return;
    }
    const syriaCountryOption = countryData.find(
      (ele) => ele?.iso3_code === "EGY" //2024_10_02: Default to Egypt
    );
    const newPathname = el.endpoint;

    if (currentLocation !== newPathname) {
      if (
        newPathname !== "Overview" &&
        currentCountry === "All Mashreq Countries"
      ) {
        const { area, latitude, longitude, iso3_code } = syriaCountryOption;
        navigate(`${newPathname}?countryFilter=${area}&countryId=${iso3_code}`);
      }

      if (newPathname === "Overview") {
        navigate(`${newPathname}?countryFilter=All Mashreq Countries`);
      }

      // else if (
      //   (newPathname === "Overview" || currentLocation === "Overview") &&
      //   (currentCountry === "All Mashreq Countries" || !currentCountry)
      // ) {
      //   navigate(`${newPathname}?countryFilter=All Mashreq Countries`);
      // }
      // else if (newPathname === "Overview") {
      //   navigate(`${newPathname}?countryFilter=All Mashreq Countries`);
      // }
      // Get the current URL search params
      const queryParams = new URLSearchParams(window.location.search);
      // Set the new pathname
      // Update the pathname without changing existing search params
      navigate(`${newPathname}?${queryParams.toString()}`);
      // navigate(
      //   `${el.endpoint}`
      // );
    }
  };
  return (
    <BarData
      className={`${isRecentCollapsed ? "collapsed" : ""} ${
        isRecentCollapsed ? (expandedleft ? "hovers" : "") : ""
      }`}
    >
      <Recent>
        {/* <RecentText>categories</RecentText> */}
        {sidebarMockData?.map((el, i) => (
          <NavLink
            key={i}
            to={el?.endpoint}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            onMouseOver={() => setHoveredIndex(i)}
            onMouseOut={() => setHoveredIndex(null)}
          >
            <StyledItem
              theme={theme}
              onClick={(e) => handleClick(e, el)}
              className={currentLocation === el.endpoint ? "selected" : ""}
              key={i}
            >
              <EllipsisRefWrapper>
                <img
                  src={
                    hoveredIndex === i
                      ? gifMapping[el.value]
                      : iconMapping[el.value]
                  }
                  width={30}
                  height={30}
                  alt={el.value}
                />
                {el.name}
              </EllipsisRefWrapper>
            </StyledItem>
          </NavLink>
        ))}
      </Recent>
    </BarData>
  );
};

export default LeftBar;
