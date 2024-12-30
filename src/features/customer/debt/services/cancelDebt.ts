import api from "@utils/api"; // Assuming api is already configured

// Function to cancel a debt by ID
export const cancelDebt = async (debtId: string): Promise<boolean> => {
  try {
    // Make the PATCH request to cancel the debt
    const { data } = await api.patch(`/api/customer/v1/debt/${debtId}`);

    // Check if the debt was successfully canceled
    if (data) {
      return data; // Returns true if the debt was successfully canceled
    } else {
      throw new Error("Failed to cancel the debt.");
    }
  } catch (error: any) {
    // Handle errors and throw with a custom message in Vietnamese
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
          throw new Error("Không tìm thấy nợ hoặc tài khoản người dùng.");
        case 409:
          throw new Error("Nợ không thể hủy hoặc đã bị hủy.");
        case 500:
          throw new Error("Lỗi máy chủ khi hủy nợ.");
        default:
          throw new Error("Đã có lỗi xảy ra.");
      }
    } else {
      throw new Error("Đã có lỗi khi giao tiếp với máy chủ.");
    }
  }
};
