import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInFormValues } from "src/features/auth/autTypes";
import { EROLE } from "@constants/authorization";
import { ROUTES_PATH } from "@constants/path";
import useLogin from "@features/auth/hooks/useLogin";
import { useAuthStore } from "@features/auth/stores/authStore";
import SignInForm from "@features/auth/components/SignInForm";
import { MessageInstance } from "antd/es/message/interface";

interface ILoginScreenProps {
  messageApi: MessageInstance; // Prop to pass messageApi
}

const LoginScreen: React.FC<ILoginScreenProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const { login, loading } = useLogin(messageApi);
  const { isAuthenticated, role, handleLogin } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);

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

  return (
    <div className="loginScreen">
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <SignInForm onFinish={handleLoginSubmit} loading={loading} />
    </div>
  );
};

LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
