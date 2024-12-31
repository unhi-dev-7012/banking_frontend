// src/services/bankAccountService.ts
import api from "@utils/api";
import { TransApiEndpoints } from "../apiTransEndpoint";

export const getAllContact = async () => {
  try {
    const { data } = await api.get(TransApiEndpoints.GET_ALL_CONTACT);

    console.log("contact", data.contacts);

    return data.contacts;
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin danh bạ:", error);
    throw new Error("Không thể lấy thông tin danh bạ.");
  }
};
