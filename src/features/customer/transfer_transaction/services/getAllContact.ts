// src/services/bankAccountService.ts
import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";

export const getAllContact = async () => {
  try {
    const { data } = await api.get(TransApiEndpoints.GET_ALL_CONTACT);

    return data.contacts;
  } catch (error: any) {
    console.log("er", error);
    if (error.response.data.code === 40002) return;
    console.error("Lỗi khi lấy thông tin danh bạ:", error.message);
    throw new Error("Không thể lấy thông tin danh bạ.");
  }
};
