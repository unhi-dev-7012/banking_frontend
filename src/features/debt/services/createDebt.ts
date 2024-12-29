import api from "@utils/api";
import { CreateDebtFormValue, Debt } from "../debtType"; // Importing necessary types

// Create debt API service
export const createDebt = async (debt: CreateDebtFormValue): Promise<Debt> => {
  console.log("debt in api:", debt);

  try {
    const { data } = await api.post("/api/customer/v1/debt", {
      debtorId: debt.debtorId,
      amount: debt.amount,
      message: debt.message,
    });

    console.log("data in api:", data);

    return data;
  } catch (error: any) {
    // Handle errors and throw with a custom message in Vietnamese
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
          throw new Error(
            "Lỗi máy chủ bất ngờ hoặc không thể tạo nợ cho chính mình."
          );
        default:
          throw new Error("Đã có lỗi xảy ra.");
      }
    } else {
      throw new Error("Đã có lỗi khi giao tiếp với máy chủ.");
    }
  }
};
