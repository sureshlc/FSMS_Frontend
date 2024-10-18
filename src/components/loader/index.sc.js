import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  // background: #f3f7fc;

  .loader {
    width: 35px;
    height: 35px;
    background: linear-gradient(
        #0000 calc(1 * 100% / 6),
        #009edb 0 calc(3 * 100% / 6),
        #0000 0
      ),
      linear-gradient(
        #0000 calc(2 * 100% / 6),
        #009edb 0 calc(4 * 100% / 6),
        #0000 0
      ),
      linear-gradient(
        #0000 calc(3 * 100% / 6),
        #009edb 0 calc(5 * 100% / 6),
        #0000 0
      );
    background-size: 10px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
  }
  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%;
    }
    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
`;
export const Span = styled.span``;

export const SpinningLoader = styled.div`


  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
 
  border: ${({ border }) => border + "px"} solid #FFF;
  border-bottom-color: #009EDB;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
  
`;
