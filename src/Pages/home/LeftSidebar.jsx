import React, { useContext, useState } from "react";
import styled from "styled-components";
import LeftBar from "../../components/sidebar/LeftBar";
import { Menuicon } from "../../assets/icons/index";
import { ReactComponent as LogoIcon } from "../../assets/imgs/image 3.svg";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/user";

const LeftSidebar = ({
  isRecentCollapsed,
  setIsRecentCollapsed,
  setExpandedleft,
  expandedleft,
  showCategoryList,
  selectedCountry,
}) => {
  const [leftWrapperWidth, setLeftWrapperWidth] = useState("17.5rem");

  const toggleRecent = () => {
    setIsRecentCollapsed(!isRecentCollapsed);
    setLeftWrapperWidth(leftWrapperWidth === "17.5rem" ? "4.5rem" : "17.5rem");
    setExpandedleft(false);
  };

  const toggleExpandleft = () => {
    setExpandedleft(true);
  };
  const user = getUser();
  if (!user) return;
  return (
    <LeftSideWrapper>
      {/* <Header>
        <Iconwrap
          onClick={toggleRecent}
          className={isRecentCollapsed ? "reversed" : ""}
        >
          <Menuicon />
        </Iconwrap>
        <Logoicon>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <LogoIcon />
          </Link>
        </Logoicon>
        <LogoWrap
          className={`${isRecentCollapsed ? "collapsed" : ""} ${
            isRecentCollapsed ? (expandedleft ? "hovered" : "") : ""
          }`}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Heading>Food and Agriculture Organization</Heading>
          </Link>
        </LogoWrap>
      </Header> */}
      <LeftBar
        isRecentCollapsed={isRecentCollapsed}
        expandedleft={expandedleft}
      />
    </LeftSideWrapper>
  );
};

export default LeftSidebar;

const Iconwrap = styled.div`
  &.reversed {
    transform: rotate(180deg);
  }
`;

const LeftSideWrapper = styled.div`
  width: 16rem;
  height: 100%;
`;

const Header = styled.div`
  background: #f2f3f9;
  display: flex;
  height: 6rem;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
`;

const LogoWrap = styled.div`
  display: flex;
  width: 40rem;
  justify-content: space-between;
  cursor: pointer;
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
  color: #fff;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem; /* 106.667% */
  letter-spacing: -0.01875rem;
  text-align: left;
  text-wrap: balance;
`;

const Logoicon = styled.div`
  position: relative;
`;
