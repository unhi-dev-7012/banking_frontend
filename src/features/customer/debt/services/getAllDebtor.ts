// src/services/bankAccountService.ts
import api from "@utils/api";

export const getAllDebtor = async () => {
  const { data } = await api.get(`/api/customer/v1/debt/list/debtors`);
  console.log("data", data);

  return data;
};
