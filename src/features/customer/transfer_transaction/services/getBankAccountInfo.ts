import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";

export interface BankAccountInfo {
  fullName: string;
  id: string;
  balance: number;
  bankId: string;
}

const getBankAccountInfo = {
  /**
   * Lấy thông tin người dùng bao gồm fullName, bankAccount.id và balance
   */
  execute: async (): Promise<BankAccountInfo> => {
    try {
      const { data } = await api.get(TransApiEndpoints.GET_BANK_INFO);

      return {
        fullName: data.fullName,
        id: data.bankAccount.id,
        balance: data.bankAccount.balance,
        bankId: data.bankAccount.bankId,
      };
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      throw new Error("Không thể lấy thông tin người dùng.");
    }
  },
};

export default getBankAccountInfo;
