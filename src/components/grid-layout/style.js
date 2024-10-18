import styled from "styled-components";
// import mediaBreakpoints from '../../utils/theme/breakpoints';

export const Wrapper = styled("div")`
  width: 100%;

  // padding: 0.94rem 0.94rem 0.94rem 0.94rem;
  background-color: #eff4f7;
  .projectsmb {
    background-color: rgb(71, 148, 144) !important;
    color: #fff !important;
  }
  .defects {
    background-color: rgb(221, 44, 113) !important;
    color: #fff !important;
  }
  .predep {
    background-color: rgb(123, 80, 111) !important;
    color: #fff !important;
  }
  .mttr {
    background-color: rgb(68, 59, 103) !important;
    color: #fff !important;
  }
  .left {
    transform: translateX(-50vw);
    transition: transform 1s ease;
  }

  .right {
    transform: translateX(150vw);
    transition: transform 1s ease;
  }
  /* .active {
    transform: translateX(0px);
  } */
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
// const { small, semiLarge, medium } = mediaBreakpoints;
export const GridLayout = styled.div.attrs(({ className }) => ({
  className: "layout-root",
}))`
  display: grid;
  height: 100%;
  /* margin: 1.5rem; */
  padding:2px;
  grid-gap: 2px;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-auto-rows: 1fr;

  // grid-gap: 15px;
  grid-template-areas: ${({ layoutTheme }) =>
    layoutTheme.map((ele) => `'${ele}' `)};
  .box {
    transition: all 0.4s;
    cursor: pointer;
  }
  /* .box:hover {
    transform: scale(1.05);
  } */

  // @media (max-height: 768px) {
  //   grid-auto-rows: ${(props) => props.rowHeight}vh;
  // }
  @media (max-width: 767.95px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: ${({ layoutThemeMobile }) =>
    layoutThemeMobile.map((ele) => `'${ele}' `)};
    grid-auto-rows: ${(props) => props.rowHeight}vh;
  }

  @media (min-width: 768px) and (max-width: 991.95px) {
    grid-template-columns: 1fr;
    grid-template-areas: ${({ layoutThemeMobile }) =>
    layoutThemeMobile.map((ele) => `'${ele}' `)};
  }

  @media (min-width: 992px) and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: ${({ layoutThemeSemiLarge }) =>
    layoutThemeSemiLarge.map((ele) => `'${ele}' `)};
  }

  & > div {
  }

  ${(props) => {
    let classListGen = "";
    props.widgets.forEach((item) => {
      classListGen = `.${item.className} {
            grid-area: ${item.className};
        }`;
    });
    return classListGen;
  }}
`;
