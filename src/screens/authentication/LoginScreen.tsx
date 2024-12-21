import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SignInFormValues } from "src/features/auth/autTypes";
import { EROLE } from "@constants/authorization";
import { ROUTES_PATH } from "@constants/path";
import useLogin from "@features/auth/hooks/useLogin";
import { useAuthStore } from "@features/auth/stores/authStore";
import SignInForm from "@features/auth/components/SignInForm";

interface ILoginScreenProps {}

const LoginScreen: React.FC<ILoginScreenProps> = () => {
  const navigate = useNavigate();
  const { login, loading } = useLogin();
  const { handleLogin } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = async (values: SignInFormValues) => {
    setLoginError(null);
    try {
      const { username, password } = values;
      const { accessToken, refreshToken, role } = await login(
        username,
        password
      );

      handleLogin(accessToken, refreshToken, role);
      message.success(`Login Successfully! ${role}`);

      if (role === EROLE.ADMIN) {
        console.log("Login as Admin");
        navigate(ROUTES_PATH.ADMIN.DASHBOARD);
      } else if (role === EROLE.EMPLOYEE) {
        navigate(ROUTES_PATH.EMPLOYEE.CUSTOMER);
      } else if (role === EROLE.CUSTOMER) {
        navigate(ROUTES_PATH.CUSTOMER.DASHBOARD);
      }
    } catch (error: any) {
      setLoginError(error || "An unexpected error occurred. Please try again.");
      message.error(
        loginError || "Login failed. Please check your credentials."
      );
    }
  };
  return (
    <div className="loginScreen">
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <SignInForm onFinish={handleLoginSubmit} loading={loading} />
    </div>
  );
  // return (
  //   <div>
  //     <Typography.Title level={2}>LoginScreen</Typography.Title>
  //     <Typography.Paragraph>This is the LoginScreen page.</Typography.Paragraph>
  //   </div>
  // );
};

LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
