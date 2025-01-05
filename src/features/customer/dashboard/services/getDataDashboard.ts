// src/services/bankAccountService.ts
import api from "@utils/api";

const GET_DASHBOARD_ENDPOINT = "/api/customer/v1/dashboard/info";

export const getDataDashboard = async () => {
  try {
    const { data } = await api.get(GET_DASHBOARD_ENDPOINT);

    return data;
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin thống kê:", error);
    throw new Error("Không thể lấy thông tin thống kê.");
  }
};
