import { useState } from "react";
import loginUser from "../services/loginUser";
import { LoginResponse } from "../autTypes";
import { MessageInstance } from "antd/es/message/interface";

const useLogin = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string,
    captchaToken: string | null
  ): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);
    try {
      // Check if CAPTCHA token is present, else show an error message
      if (!captchaToken) {
        messageApi.error("Vui lòng xác nhận bạn không phải là robot.");
        throw new Error("Không có CAPTCHA token");
      }
      const { accessToken, refreshToken, role } = await loginUser(
        email,
        password,
        captchaToken // Pass token to the backend
      );
      messageApi.success("Đăng nhập thành công!");
      return { accessToken, refreshToken, role };
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Incorrect email or password. Please try again.");
        messageApi.error(
          "Email hoặc mật khẩu không chính xác. Vui lòng thử lại."
        );
      } else if (err.response?.status === 403) {
        setError("Account is unauthorized. Please try again.");
        messageApi.error(
          "Tài khoản không được cấp quyền truy cập. Vui lòng thử lại."
        );
      } else if (err.response?.status === 404) {
        setError("Account not found. Please check your credentials.");
        messageApi.error(
          "Không tìm thấy tài khoản. Vui lòng kiểm tra lại thông tin."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
        messageApi.error(
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau."
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
