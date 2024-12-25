import api from "@utils/api";
import { CreateEmployeeForm } from "../employeeType";

const API_ENDPOINT = "api/admin/v1/users";

export const createEmployee = async (formData: CreateEmployeeForm) => {
  try {
    const response = await api.post(API_ENDPOINT, formData);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const errorMessage =
        error.response.data?.message || "Dữ liệu không hợp lệ";
      throw new Error(errorMessage);
    }

    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};
