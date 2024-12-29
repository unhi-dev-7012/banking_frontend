import api from "../../../../utils/api";
import { CreateCustomerForm } from "../employeeType";

export const createCustomer = async (formData: CreateCustomerForm) => {
  try {
    const response = await api.post("api/employee/v1/users", formData);

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
