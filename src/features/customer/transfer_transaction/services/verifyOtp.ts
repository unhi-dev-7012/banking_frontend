import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";
import { VerifyOtpPayload, VerifyOtpResponse } from "../transactionType";

const verifyOtp = {
  /**
   * Xác minh OTP giao dịch
   */
  execute: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    try {
      const { data } = await api.post(TransApiEndpoints.VERIFY_OPT, payload);
      return data; // Trả về dữ liệu xác minh OTP
    } catch (error: any) {
      throw new Error(error || "Xác minh OTP thất bại.");
    }
  },
};

export default verifyOtp;
