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
import requestResetPassword from "@features/auth/services/requestResetPassword";
import resetPassword from "@features/auth/services/resetPassword";

interface ILoginScreenProps {
  messageApi: MessageInstance; // Prop to pass messageApi
}

enum FormState {
  LOGIN = "login",
  FORGOT_PASSWORD = "forgotPassword",
  OTP = "otp",
  SET_NEW_PASSWORD = "setNewPassword",
}

const LoginScreen: React.FC<ILoginScreenProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const { login, loading } = useLogin(messageApi);
  const { isAuthenticated, role, handleLogin } = useAuthStore();
  const [currentForm, setCurrentForm] = useState<FormState>(FormState.LOGIN);
  const [email, setEmail] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

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
      // Reset CAPTCHA when error occurs
      recaptchaRef.current?.reset();
    }
  };
  if (isAuthenticated) return null;

  const handleForgotPassword = () => setCurrentForm(FormState.FORGOT_PASSWORD);
  const handleBackToLogin = () => setCurrentForm(FormState.LOGIN);
  const handleToOtpForm = async (email: string) => {
    setEmail(email);
    console.log(email);
    try {
      const { userId } = await requestResetPassword(email);
      setUserId(userId);
      setCurrentForm(FormState.OTP);
      messageApi.success("Mã OTP đã được gửi đến email của bạn!");
    } catch (error: any) {
      messageApi.error("Không tìm thấy thông tin tài khoản!");
    }
  };

  const handleSetNewPassword = async (
    newPassword: string,
    confirmPassword: string,
    resetToken: string
  ) => {
    try {
      const response = await resetPassword(
        newPassword,
        confirmPassword,
        resetToken
      ); // Assuming resetPasswordAPI accepts newPassword and userId
      if (response) {
        messageApi.success("Mật khẩu đã được thay đổi thành công!");
        setCurrentForm(FormState.LOGIN); // Redirect to login page after success
      } else {
        messageApi.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
      }
    } catch (error: any) {
      messageApi.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleOtpContinue = (resetToken: string) => {
    setResetToken(resetToken);
    setCurrentForm(FormState.SET_NEW_PASSWORD); // Move to set new password form
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
        {currentForm === FormState.LOGIN && (
          <SignInForm
            onFinish={handleLoginSubmit}
            loading={loading}
            onForgotPassword={handleForgotPassword}
            recaptchaRef={recaptchaRef}
          />
        )}
        {currentForm === FormState.FORGOT_PASSWORD && (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
            onResetPassword={(email) => handleToOtpForm(email)}
          />
        )}
        {currentForm === FormState.OTP && (
          <OTPForm
            email={email}
            userId={userId}
            onBackToLogin={handleBackToLogin}
            onContinue={handleOtpContinue}
          />
        )}
        {currentForm === FormState.SET_NEW_PASSWORD && (
          <SetNewPasswordForm
            onBackToLogin={handleBackToLogin}
            onResetPassword={(newPassword, confirmPassword, resetPassword) =>
              handleSetNewPassword(newPassword, confirmPassword, resetPassword)
            }
            resetToken={resetToken || ""}
          />
        )}
      </Flex>
    </Flex>
  );
};

LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
