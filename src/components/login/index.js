import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loginimage from "./loginimage.jpg";
import { FaTimes } from "react-icons/fa";
import {
  BlueDiv,
  Container,
  WhiteDiv,
  LoginForm,
  InputContainer,
  Input,
  PasswordVisibilityToggle,
  Button,
  ErrorContainer,
  LoadingContainer,
  Logocontainer,
  SignInText,
  StyledToastContainer,
  IconContainer,
} from "./index.sc";
import { useNavigate } from "react-router";
import { ReactComponent as Logoimg } from "./logo.svg";
import Eyecloseicon from "../../assets/icons/components/eyecloseicon";
import Eyeicon from "../../assets/icons/components/eyeicon";
import { getUser, setUser } from "../../utils/user";
import { loginUser } from "../../services";
import { useMutation } from "@tanstack/react-query";
import Loader from "../loader/Loader";
import useQueryParams from "../../hooks/useQueryParams";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { getQueryParam, deleteQueryParam } = useQueryParams();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const user = getUser();
  const isSessionExpired = getQueryParam("expired") || false;
  const isJWTExpired = getQueryParam("jwt-expired") || false;

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const {
    mutate: login,
    isPending: isLoginPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.data.data.accessToken);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/Overview"); // Navigate to the Overview page
    },
    onError: () => {
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    login({ username, password }); // Call the login mutation
  };

  // showing session expiry message
  useEffect(() => {
    if (isSessionExpired) {
      toast.error("Session timed out. Please log in again to continue.", {
        icon: (
          <IconContainer>
            <FaTimes />
          </IconContainer>
        ), // Using the X icon for the error toast
      });
      deleteQueryParam("expired");
    }
    if (isJWTExpired) {
      toast.error("JWT token expired. Please log in again to continue.", {
        icon: (
          <IconContainer>
            <FaTimes />
          </IconContainer>
        ), // Using the X icon for the error toast
      });
      deleteQueryParam("jwt-expired");
    }
  }, [isSessionExpired, isJWTExpired, deleteQueryParam]);

  if (user) {
    return navigate("/Overview");
  }

  return (
    <Container>
      <BlueDiv>
        <img src={Loginimage} alt="Login background" />
      </BlueDiv>
      <WhiteDiv>
        <Logocontainer>
          <Logoimg />
          {/* <img src={Logo} alt="" srcset="" /> */}
        </Logocontainer>
        <LoginForm onSubmit={handleSubmit}>
          {/* <h2>Sign In</h2> */}
          <SignInText>Please sign in to continue</SignInText>
          <InputContainer>
            <Input type="text" placeholder="Username" ref={usernameRef} />
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={passwordRef}
            />
            <PasswordVisibilityToggle onClick={togglePasswordVisibility}>
              {showPassword ? <Eyecloseicon /> : <Eyeicon />}
            </PasswordVisibilityToggle>
            <ErrorContainer>
              {showError && isError && error?.response?.data?.error?.message}
              {isSessionExpired && "Session expired. Please login again."}
            </ErrorContainer>
          </InputContainer>

          <Button>
            <LoadingContainer>
              {isLoginPending && (
                <Loader
                  height={20}
                  width={20}
                  type="spinning"
                  spinnerWidth={3}
                />
              )}
            </LoadingContainer>
            Sign In
          </Button>
        </LoginForm>
      </WhiteDiv>
      <StyledToastContainer />
    </Container>
  );
};

export default LoginPage;
