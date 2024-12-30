import api from "@utils/api"; // Assuming api is correctly configured as per your given code
import { Debt } from "../debtType"; // Assuming Debt type is defined somewhere

// Function to fetch debt details by ID
export const getDebtDetail = async (debtId: string): Promise<Debt> => {
  try {
    const { data } = await api.get(`/api/customer/v1/debt/${debtId}`, {
      params: { includeUser: true },
    });

    if (data) {
      return data.debt;
    } else {
      throw new Error("Không tìm thấy thông tin nợ.");
    }
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Dữ liệu yêu cầu không hợp lệ. Vui lòng kiểm tra lại."
          );
        case 401:
          throw new Error("Cần phải xác thực để thực hiện hành động này.");
        case 403:
          throw new Error("Bạn không có quyền truy cập.");
        case 404:
          throw new Error("Không tìm thấy thông tin nợ.");
        case 500:
          throw new Error("Lỗi máy chủ bất ngờ.");
        default:
          throw new Error("Đã có lỗi xảy ra.");
      }
    } else {
      throw new Error("Đã có lỗi khi giao tiếp với máy chủ.");
    }
  }
};
