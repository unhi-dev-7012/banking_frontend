import api from "@utils/api";

const requestResetPassword = async (email: string) => {
  try {
    const response = await api.post("/api/auth/v1/request-reset-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi yêu cầu reset mật khẩu");
  }
};
export default requestResetPassword;
