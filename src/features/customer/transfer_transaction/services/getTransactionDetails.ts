import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";
import {
  GetTransactionResponse,
  Transaction,
  TransactionStatus,
} from "../transactionType";

const transformToTransaction = (
  response: GetTransactionResponse
): Transaction => {
  return {
    id: response.id,
    createdAt: response.date,
    updatedAt: response.date,
    amount: response.amount,
    remitterId: "",
    type: "normal",
    transactionFee: 0,
    beneficiaryId: "",
    beneficiaryBankId: "",
    remitterPaidFee: true,
    message: response.message,
    beneficiaryName: "",
    remitterBankId: "",
    remitterName: "",
    status: response.status as TransactionStatus,
  };
};

const getTransactionDetails = {
  /**
   * Lấy thông tin chi tiết giao dịch
   */
  execute: async (id: string): Promise<Transaction> => {
    // Chỉnh sửa kiểu trả về thành Transaction
    try {
      const { data } = await api.get<GetTransactionResponse>(
        TransApiEndpoints.GET_TRANSACTION(id)
      );
      const transaction: Transaction = transformToTransaction(data); // Chuyển đổi kết quả từ API
      return transaction; // Trả về Transaction đã chuyển đổi
    } catch (error: any) {
      console.error("Lỗi khi lấy chi tiết giao dịch:", error);
      throw new Error(error || "Không thể lấy thông tin giao dịch");
    }
  },
};

export default getTransactionDetails;
