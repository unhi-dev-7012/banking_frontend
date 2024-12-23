import api from "@utils/api";

const verifyOtp = async (userId: string, otp: string) => {
  try {
    const response = await api.post("/api/auth/v1/otp-verify", {
      userId,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error("Mã OTP không hợp lệ hoặc hết hạn");
  }
};

export default verifyOtp;
