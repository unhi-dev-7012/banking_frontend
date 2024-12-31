// src/services/bankAccountService.ts
import api from "@utils/api";

export const getBankAccountWithUser = async (id: string) => {
  const { data } = await api.post(`/api/customer/v1/bank-accounts/get-one`, {
    id: id,
    code: "NHB", //Refactor before
  });

  return data;
};
