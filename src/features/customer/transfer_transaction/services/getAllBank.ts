// src/services/bankAccountService.ts
import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";
import { Bank } from "../transactionType";

export const getAllBank = async () => {
  try {
    const { data } = await api.get(TransApiEndpoints.GET_ALL_BANK);

    const banks: Bank[] = data.map((bank: any) => ({
      id: bank.id,
      code: bank.code,
      name: bank.name,
      shortName: bank.shortName,
    }));

    return banks;
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin ngân hàng:", error);
    throw new Error("Không thể lấy thông tin ngân hàng.");
  }
};
