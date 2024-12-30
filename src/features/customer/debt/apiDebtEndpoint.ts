// src/constants/apiEndpoints.ts

export const DebtApiEndpoints = {
  // Endpoint lấy danh sách nợ
  LIST_DEBTS: "/api/customer/v1/debt",

  LIST_DEBTS_USER:
    "/api/customer/v1/debt?sort=createdAt&direction=desc&includeUser=true",

  // Endpoint lấy thông tin chi tiết một khoản nợ
  GET_DEBT_DETAILS: (id: string) => `/api/customer/v1/debt/${id}`,

  // Endpoint tạo một khoản nợ
  CREATE_DEBT: "/api/customer/v1/debt",

  // Endpoint hủy một khoản nợ
  CANCEL_DEBT: (id: string) => `/api/customer/v1/debt/${id}`,

  // Endpoint thanh toán một khoản nợ
  SETTLE_DEBT: "/api/customer/v1/debt/settle",
};
