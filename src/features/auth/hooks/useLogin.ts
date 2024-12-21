import { useState } from "react";
import loginUser from "../services/loginUser";
import { LoginResponse } from "../autTypes";

const useLogin = () => {
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
      return { accessToken, refreshToken, role };
    } catch (err: any) {
      if (err.response?.status === 401)
        setError("Incorrect email or password. Please try again.");
      else if (err.response?.status === 403)
        setError("Account is unauthorized. Please try again.");
      else if (err.response?.status === 404)
        setError("Account not found. Please check your credentials.");
      else setError("An unexpected error occurred. Please try again later.");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
