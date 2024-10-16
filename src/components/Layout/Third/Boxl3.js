import React from "react";
import styled from 'styled-components';

const MainContent3 = styled.div`
  width: 90%;
  margin: auto;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const TopContent3 = styled.div`
  text-align: center;
  padding-top: 1.875rem;
  vertical-align: middle;
  color: #777;
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
`;

const SvgIcon = styled.svg`
  color: #777;
`;

const Title = styled.div`
  font-weight: 700;
`;

const SignTextCon3 = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: #ed0295;
  font-size: 0.75rem;
  line-height: 1.2;
  text-align: left;
  padding-left: 0.2rem;
  font-weight: 400;
`;

const BottomContent3Span = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #ed0295;
  font-size: 2rem;
  font-weight: 700;
`;

const BottomContentSvg = styled.svg`
  font-size: 2rem;
  fill: #ed0295;
  margin-top: 0.375rem;
`;

const BottomMainContent = styled.div`
  padding-bottom: 1.875rem;
`;

const BoxDataContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.3rem;
`;

const BoxDataContentDiv = styled.div`
  color: #ed0295;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

const LastLine = styled.div`
  color: #777;
  font-size: 0.75rem;
  margin-top: 0.375rem;
`;

const Boxl3 = ({ box }) => {
  return (
    <MainContent3 className="main-content-3">
      <TopContent3 className="top-content-3">
        <Title className="title"></Title>
      </TopContent3>
      <div className="bottom-content-3">
        <SignTextCon3 className="sign-text-con-3"></SignTextCon3>
        <BottomContent3Span />
        <BottomContentSvg />
      </div>
      <BottomMainContent className="bottom-main-content">
        <BoxDataContent className="box-data-content">
          <BoxDataContentDiv />
          <LastLine className="lastline"></LastLine>
        </BoxDataContent>
      </BottomMainContent>
    </MainContent3>
  );
};

export default Boxl3;
