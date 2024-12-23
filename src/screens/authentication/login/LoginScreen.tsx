import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInFormValues } from "src/features/auth/autTypes";
import { EROLE } from "@constants/authorization";
import { ROUTES_PATH } from "@constants/path";
import useLogin from "@features/auth/hooks/useLogin";
import { useAuthStore } from "@features/auth/stores/authStore";
import SignInForm from "@features/auth/components/SignInForm";
import { MessageInstance } from "antd/es/message/interface";
import { Flex } from "antd";
import styles from "@screens/authentication/login/login.module.css";
import ForgotPasswordForm from "@features/auth/components/ForgotPasswordForm";
import OTPForm from "@features/auth/components/OTPForm";
import SetNewPasswordForm from "@features/auth/components/SetNewPasswordForm";
import ReCAPTCHA from "react-google-recaptcha";

interface ILoginScreenProps {
  messageApi: MessageInstance; // Prop to pass messageApi
}

const LoginScreen: React.FC<ILoginScreenProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const { login, loading } = useLogin(messageApi);
  const { isAuthenticated, role, handleLogin } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState("loginForm");
  const [email, setEmail] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === EROLE.ADMIN) {
        navigate(ROUTES_PATH.ADMIN.DASHBOARD);
      } else if (role === EROLE.EMPLOYEE) {
        navigate(ROUTES_PATH.EMPLOYEE.CUSTOMER);
      } else if (role === EROLE.CUSTOMER) {
        navigate(ROUTES_PATH.CUSTOMER.DASHBOARD);
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleLoginSubmit = async (values: SignInFormValues) => {
    setLoginError(null);
    const token = recaptchaRef.current?.getValue(); // Get the CAPTCHA token here
    if (!token) {
      messageApi.error("Vui lòng xác thực CAPTCHA");
      return;
    }
    try {
      const { username, password } = values;
      const { accessToken, refreshToken, role } = await login(
        username,
        password,
        token
      );

      handleLogin(accessToken, refreshToken, role);
    } catch (error: any) {
      const errorMessage = error?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      setLoginError(errorMessage);

      // Reset CAPTCHA when error occurs
      recaptchaRef.current?.reset();
    }
  };
  if (isAuthenticated) return null;

  const handleForgotPassword = () => {
    setCurrentForm("forgotPasswordForm"); // Switch to Forgot Password form
    recaptchaRef.current?.reset();
  };

  const handleBackToLogin = () => {
    setCurrentForm("loginForm"); // Switch back to Login form
    recaptchaRef.current?.reset();
  };

  const handleResetPassword = () => {
    // Store the email when resetting the password
    setEmail("user@example.com"); // This should be the email entered during the Forgot Password form
    setCurrentForm("otpForm"); // Switch to OTP form
    recaptchaRef.current?.reset();
  };

  const handleSetNewPassword = () => {
    setCurrentForm("setNewPasswordForm"); // Switch to Set New Password form
    recaptchaRef.current?.reset();
  };

  return (
    <Flex className={styles.loginScreen}>
      <Flex className={styles.leftContainer} align="center" justify="center">
        <img
          src="https://img.freepik.com/free-vector/abstract-digital-landscape-background_52683-96754.jpg?t=st=1734947456~exp=1734951056~hmac=86f4ef3b5ec54ee0acd21477e6fe51c536bf5957d3b1589b758d26d21433a7ee&w=1380"
          alt=""
        />
      </Flex>
      <Flex
        className={styles.rightContainer}
        align="center"
        vertical
        gap="middle"
        justify="center"
      >
        <img src="src/assets/images/horizontal_logo.png" alt="" />

        {/* Conditional Rendering based on currentForm */}
        {currentForm === "loginForm" && (
          <SignInForm
            onFinish={handleLoginSubmit}
            loading={loading}
            onForgotPassword={handleForgotPassword}
            recaptchaRef={recaptchaRef}
          />
        )}
        {currentForm === "forgotPasswordForm" && (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
            onResetPassword={handleResetPassword}
            loading={loading}
          />
        )}
        {currentForm === "otpForm" && (
          <OTPForm
            email={email}
            onBackToLogin={handleBackToLogin}
            onContinue={handleSetNewPassword}
          />
        )}
        {currentForm === "setNewPasswordForm" && (
          <SetNewPasswordForm
            onBackToLogin={handleBackToLogin}
            onResetPassword={handleBackToLogin}
          />
        )}
      </Flex>
    </Flex>
  );
};

LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
