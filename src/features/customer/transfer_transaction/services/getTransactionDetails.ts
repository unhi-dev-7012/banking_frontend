import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";
import { Transaction } from "../transactionType";

const getTransactionDetails = {
  /**
   * Lấy thông tin chi tiết giao dịch
   */
  execute: async (id: string): Promise<Transaction> => {
    // Chỉnh sửa kiểu trả về thành Transaction
    try {
      const { data } = await api.get(TransApiEndpoints.GET_TRANSACTION(id));
      // Chuyển đổi kết quả từ API
      return data.transaction; // Trả về Transaction đã chuyển đổi
    } catch (error: any) {
      console.error("Lỗi khi lấy chi tiết giao dịch:", error);
      throw new Error(error || "Không thể lấy thông tin giao dịch");
    }
  },
};

export default getTransactionDetails;
