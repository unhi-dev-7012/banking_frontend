import api from "../../../../utils/api";

const API_ENDPOINT = "api/customer/v1/notifications";

export const getNotification = async (
  page: number,
  limit: number,
  type: string | undefined
): Promise<Record<string, any>> => {
  try {
    const response = await api.get(API_ENDPOINT, {
      params: { page, type, limit },
    });
    return response;
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
