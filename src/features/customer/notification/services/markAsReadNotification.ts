import api from "../../../../utils/api";

const API_ENDPOINT = "/api/customer/v1/notifications/read";

export const markAsReadNotifications = async (): Promise<
  Record<string, any>
> => {
  try {
    const response = await api.post(API_ENDPOINT);
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
