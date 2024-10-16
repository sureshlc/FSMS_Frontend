import styled from "styled-components";

export const PopupBackWrapper = styled.div`
  top: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  background: rgba(160, 167, 198, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  transition: 0.3s ease-in-out;
  z-index: 1000;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const PopupContainer = styled.div`
  width: ${({ width = "75vw" }) => width};
  max-height: 95vh;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: ${(props) =>
    props.open ? "translate(-50%, -50%)" : "translate(-50%,0)"};
  box-sizing: border-box;
  transition: 0.3s ease-in-out;
  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.3);
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  gap: 10px;
  z-index: 1000;
`;

export const Back = styled.div`
  box-sizing: border-box;
  height: 400px;
  border: 2px solid black;
  width: 100%;
  background: #542354;
  display: flex;
  align-items: center;
`;

export const XCircle = styled.div`
  position: absolute;
  top: 14px;
  right: 20px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// Overview Content styling

export const ContentWrpr = styled.div`
  width: 51rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TitlesBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Titlewrpr = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #000000;
`;

export const Descriptionwrpr = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #585858;
`;

export const Labelwrpr = styled.label`
  box-sizing: border-box;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f6f7fb;
  border: 1px solid #c3c7d9;
  border-radius: 10px;
`;

export const Inputwrpr = styled.input`
  border: none;
  outline: none;
  background: #f6f7fb;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  padding-top: 3px;
  width: 100%;
  &:focus {
    background: #f6f7fb;
  }
  &::placeholder {
    font-weight: 500;
    font-size: 15px;
    color: #999999;
    display: flex;
    align-items: flex-end;
  }
`;

export const SubTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.87rem;
  color: #000000;
`;

export const Line = styled.div`
  width: 100%;
  opacity: 0.5;
  border: 0.5px solid #c3c7d9;
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BoxTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  color: #000000;
`;

export const CheckBoxwrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  background-color: #ffffff;
  &:checked {
    width: 1rem;
    height: 1rem;
    accent-color: #675ef2;
    border-radius: 3px;
  }
`;

export const CheckBoxtxt = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;

export const ButtonContainer = styled.div`
  height: 3.4rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 0.6rem;
  border-top: 1.2px solid #c3c7d9;
`;

export const PopButton = styled.div`
  box-sizing: border-box;
  padding: 9px 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${(props) => props.background};
  border-radius: 10px;
  gap: 0.6rem;
  cursor: pointer;
`;

export const ButtonTxt = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
