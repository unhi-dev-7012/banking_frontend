// src/services/bankAccountService.ts
import api from "@utils/api";

export const getBankAccountWithUser = async (
  id: string,
  bankCode: string | undefined = undefined
) => {
  const { data } = await api.post(`/api/customer/v1/bank-accounts/get-one`, {
    id,
    code: bankCode || "NHB", // Default to undefined if not provided
  });

  return data;
};
