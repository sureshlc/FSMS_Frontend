import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

export const BlueDiv = styled.div`
  width: 50%;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const WhiteDiv = styled.div`
  width: 50%;
  height: 100vh;
  /* margin-top: 7%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.63rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    font-family: Inter;
    font-size: 1.4328rem;
    font-weight: 700;
    line-height: 1.688rem;
    letter-spacing: 0em;
    text-align: center;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  min-width: 27.1875rem;
`;

export const ErrorContainer = styled.div`
  font-size: 0.63rem;
  font-weight: normal;
  color: #ff0000;
  padding-top: 0.31rem;
  height: 8px;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0.93rem;
  left: 0.94rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d0d5dd;
  outline: none;
  border-radius: 0.3125rem;
  height: 2.8125rem;
  &::placeholder {
    font-family: Inter;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.125rem;
    letter-spacing: 0em;
    text-align: left;
    color: #99a1b7;
  }
`;

export const PasswordVisibilityToggle = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 0.625rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  background-color: #009edb;
  color: white;
  border: none;
  border-radius: 0.38625rem;
  cursor: pointer;
  font-family: Inter;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.3125rem;
  letter-spacing: 0em;
  text-align: center;
  height: 3.125rem;
`;

export const Logocontainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignInText = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: 0.9375rem;
  line-height: 1.1344rem;
  text-align: center;
  color: #99a1b7;
  margin-top: -1.3rem;
`;

export const StyledToastContainer = styled(ToastContainer).attrs({
  position: "top-center",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  closeButton: false,
  draggablePercent: 60,
  newestOnTop: true,
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
})`

  width: 500px !important;
  top: 30px !important;
  border-radius: 8px !important;
  padding: 15px !important;

  position: fixed !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;


  .Toastify__toast {
    min-height: 0px !important;
  }
  
    .Toastify__toast--error {
      background: white; 
      box-shadow: 0px 5px 15px 0px #00000040 !important;
      .Toastify__toast-body div {
        font-family: Inter !important;
        font-weight: 400 !important;
        font-size: 1rem !important;
        line-height: 1.21rem !important;
        color: black !important; 

    }
    
  `;

export const IconContainer = styled.div`
  background-color: #f9292d; // Red background for the circle
  color: white; // White color for the icon
  display: inline-flex; // Use flex to center the icon
  align-items: center;
  height: 20px;
  width: 20px;
  margin-top: -2px;
  top: 2px;
  left: 2px;
  justify-content: center;
  border-radius: 50%; // Make it round
  padding: 2px; // Adjust the size of the circle
  svg {
    color: white;
    width: 12px; // Adjust the size of the icon
    height: 12px; // Adjust the size of the icon
    border: 2px;
  }
`;
