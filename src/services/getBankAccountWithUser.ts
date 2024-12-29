// src/services/bankAccountService.ts
import api from "@utils/api";

export const getBankAccountWithUser = async (id: string) => {
  console.log("id", id);
  const { data } = await api.get(
    `/api/customer/v1/bank-accounts/${id}?includeUser=true`
  );
  console.log("data", data);

  return data;
};
