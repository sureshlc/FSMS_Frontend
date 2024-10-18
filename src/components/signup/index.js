import React, { useRef, useState } from "react";
// import { toast } from "react-toastify";
import Loginimage from "./loginimage.jpg";
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
} from "./index.sc";
import { useNavigate } from "react-router";
import { ReactComponent as Logoimg } from "./logo.svg";
import Eyecloseicon from "../../assets/icons/components/eyecloseicon";
import Eyeicon from "../../assets/icons/components/eyeicon";
import { signupUser } from "../../services";
import { useMutation } from "@tanstack/react-query";
import Loader from "../loader/Loader";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cnfPasswordRef = useRef();
    const navigate = useNavigate();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword((prevState) => !prevState);
    };

    const {
        mutate: signup,
        isPending: isLoginPending,
        isError,
        error,
    } = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            cnfPasswordRef.current.value = "";
            navigate("/login"); // Navigate to the login page
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
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const cnfPassword = cnfPasswordRef.current.value;
        if (password !== cnfPassword) {
            alert("password not matched");
        } else {
            signup({ username, password, email });
        }
    };

    // showing session expiry message
    // useEffect(() => {
    //     if (isSessionExpired) {
    //         toast.error("Session timed out. Please log in again to continue.", {
    //             icon: (
    //                 <IconContainer>
    //                     <FaTimes />
    //                 </IconContainer>
    //             ), // Using the X icon for the error toast
    //         });
    //         deleteQueryParam("expired");
    //     }
    //     if (isJWTExpired) {
    //         toast.error("JWT token expired. Please log in again to continue.", {
    //             icon: (
    //                 <IconContainer>
    //                     <FaTimes />
    //                 </IconContainer>
    //             ), // Using the X icon for the error toast
    //         });
    //         deleteQueryParam("jwt-expired");
    //     }
    // }, [isSessionExpired, isJWTExpired, deleteQueryParam]);

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
                    <SignInText>Register your account</SignInText>
                    <InputContainer>
                        <Input
                            type="text"
                            placeholder="Username"
                            ref={usernameRef}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input type="text" placeholder="Email" ref={emailRef} />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            ref={cnfPasswordRef}
                        />
                        <PasswordVisibilityToggle
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <Eyecloseicon /> : <Eyeicon />}
                        </PasswordVisibilityToggle>
                        <ErrorContainer>
                            {showError &&
                                isError &&
                                error?.response?.data?.error?.message}
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
                        Sign Up
                    </Button>
                </LoginForm>
                <SignInText>
                    Already registered?{" "}
                    <a
                        style={{ textDecoration: "none", color: "blue" }}
                        href="/login"
                    >
                        Login
                    </a>
                </SignInText>
            </WhiteDiv>
            <StyledToastContainer />
        </Container>
    );
};

export default SignupPage;
