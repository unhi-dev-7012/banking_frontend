// src/services/bankAccountService.ts
import api from "@utils/api";

const GET_MONEY_FLOW_ENDPOINT = (mode: string) =>
  `/api/customer/v1/transactions/chart/data?mode=${mode}`;
export const getMoneyFlowData = async (mode: string) => {
  try {
    const { data } = await api.get(GET_MONEY_FLOW_ENDPOINT(mode));

    return data;
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin thống kê cho chart:", error);
    throw new Error("Không thể lấy thông tin thống kê cho chart.");
  }
};
