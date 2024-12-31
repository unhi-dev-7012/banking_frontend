// src/constants/apiEndpoints.ts

export const TransApiEndpoints = {
  GET_BANK_INFO: "/api/customer/v1/me?relations=bankAccount",
  // Endpoint lấy danh sách nợ

  GET_ALL_CONTACT: "/api/customer/v1/contact/contact/all",

  CREATE_TRANSACTION: "/api/customer/v1/transactions",

  // Endpoint verifyotp
  VERIFY_OPT: `/api/customer/v1/transactions/verify-otp`,

  // Endpoint lấy thông tin giao dịch
  GET_TRANSACTION: (id: string) => `/api/customer/v1/transactions/${id}`,

  // Endpoint hủy giao dịch
  // CANCEL_TRANSACTION: (id: string) => `/api/customer/v1/debt/${id}`,
};
