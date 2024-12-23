import api from "@utils/api";

const resetPassword = async (
  newPassword: string,
  confirmPassword: string,
  resetToken: string
) => {
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Mật khẩu và xác nhận mật khẩu không trùng khớp");
    }

    const response = await api.post(
      "/api/auth/v1/reset-password",
      {
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${resetToken}`, // Gửi token dưới dạng Bearer token trong header
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi cập nhật mật khẩu");
  }
};

export default resetPassword;
