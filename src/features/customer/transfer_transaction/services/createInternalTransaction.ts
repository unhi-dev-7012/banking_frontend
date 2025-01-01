import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";
import { CreateTransactionPayload, Transaction } from "../transactionType";

const createInternalTransaction = {
  /**
   * Tạo giao dịch mới
   */
  execute: async (payload: CreateTransactionPayload): Promise<Transaction> => {
    try {
      const { data } = await api.post(
        TransApiEndpoints.CREATE_TRANSACTION,
        payload
      );
      return data; // Trả về dữ liệu giao dịch
    } catch (error: any) {
      console.error("Lỗi khi tạo giao dịch:", error);
      throw new Error(error || "Không thể tạo giao dịch.");
    }
  },
};

export default createInternalTransaction;
