import { useState } from "react";
import loginUser from "../services/loginUser";
import { LoginResponse } from "../autTypes";
import { MessageInstance } from "antd/es/message/interface";

const useLogin = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);
    try {
      const { accessToken, refreshToken, role } = await loginUser(
        email,
        password
      );
      messageApi.success("Login Successfully!");
      return { accessToken, refreshToken, role };
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Incorrect email or password. Please try again.");
        messageApi.error("Incorrect email or password. Please try again.");
      } else if (err.response?.status === 403) {
        setError("Account is unauthorized. Please try again.");
        messageApi.error("Account is unauthorized. Please try again.");
      } else if (err.response?.status === 404) {
        setError("Account not found. Please check your credentials.");
        messageApi.error("Account not found. Please check your credentials.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        messageApi.error(
          "An unexpected error occurred. Please try again later."
        );
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
