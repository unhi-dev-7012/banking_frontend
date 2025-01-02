import api from "@utils/api";
import { DebtApiEndpoints } from "../apiDebtEndpoint";
import { Transaction } from "@features/customer/transfer_transaction/transactionType";
// Create debt API service
export const settleDebt = async (debtId: string): Promise<Transaction> => {
  try {
    const { data } = await api.post(DebtApiEndpoints.SETTLE_DEBT(debtId));
    return data.data;
  } catch (error: any) {
    // Handle errors and throw with a custom message in Vietnamese
    console.log("erorr", error);
    console.log("erorr response", error.response.status);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Xác thực không thành công. Vui lòng kiểm tra lại dữ liệu."
          );
        case 401:
          throw new Error("Cần phải xác thực để thực hiện hành động này.");
        case 403:
          throw new Error("Không có quyền truy cập.");
        case 404:
          throw new Error("Không tìm thấy tài khoản người nợ.");
        case 500:
          throw new Error("Lỗi máy chủ bất ngờ hoặc không thể thanh toán nợ.");
        default:
          throw new Error("Đã có lỗi xảy ra.");
      }
    } else {
      throw new Error("Đã có lỗi khi giao tiếp với máy chủ.");
    }
  }
};
