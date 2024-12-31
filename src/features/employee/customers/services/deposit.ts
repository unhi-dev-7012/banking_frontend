import api from "../../../../utils/api";

export const depositCustomer = async (
  id: string,
  email: string,
  amount: number
) => {
  try {
    const response = await api.post("/api/customer/v1/bank-accounts/deposit", {
      id: id,
      email: email,
      amount: amount,
    });

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
