import React, { useEffect, useState } from "react";
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
    try {
      const { username, password } = values;
      const { accessToken, refreshToken, role } = await login(
        username,
        password
      );

      handleLogin(accessToken, refreshToken, role);
    } catch (error: any) {
      const errorMessage =
        error?.message || "An unexpected error occurred. Please try again.";
      setLoginError(errorMessage);
    }
  };
  if (isAuthenticated) return null;

  const handleForgotPassword = () => {
    setCurrentForm("forgotPasswordForm"); // Switch to Forgot Password form
  };

  const handleBackToLogin = () => {
    setCurrentForm("loginForm"); // Switch back to Login form
  };

  const handleResetPassword = () => {
    // Store the email when resetting the password
    setEmail("user@example.com"); // This should be the email entered during the Forgot Password form
    setCurrentForm("otpForm"); // Switch to OTP form
  };

  const handleSetNewPassword = () => {
    setCurrentForm("setNewPasswordForm"); // Switch to Set New Password form
  };

  return (
    <Flex className={styles.loginScreen}>
      <Flex className={styles.leftContainer} align="center" justify="center">
        <img
          src="https://cdn.dribbble.com/userupload/14694731/file/original-3536340a75b501a14793a49cfeb71193.png?resize=1024x1024&vertical=center"
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
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        {/* Conditional Rendering based on currentForm */}
        {currentForm === "loginForm" && (
          <SignInForm
            onFinish={handleLoginSubmit}
            loading={loading}
            onForgotPassword={handleForgotPassword}
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
