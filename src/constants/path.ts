export const ROUTES_PATH = {
  //PATH FOR INTENET BANKING BASE ON TEMPLATE
  CUSTOMER: {
    DASHBOARD: "/customer/dashboard",
    ACCOUNT: "/account",
    ACCOUNT_LIST: "/account/list",
    TRANSFER: "/transfer",
    INTERNAL_TRANSFER: "/transfer/internal",
    EXTERNAL_TRANSFER: "/transfer/external",
    CONTACT: "/contact",
    CONTACT_LIST: "/contact/list",
    DEBT: "/debt",
    DEBT_LIST: "/debt/list",
    HISTORY: "/customer/history",
  },
  EMPLOYEE: {
    CUSTOMER: "/customer",
    CUSTOMER_LIST: "/customer/list",
    CUSTOMER_CREATE: "/customer/create",
    DEPOSIT: "/deposit",
    HISTORY: "/employee/history/:customerId",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    EMPLOYEE: "/employee",
    EMPLOYEE_LIST: "/employee/list",
  },

  // General
  LOGIN: "/",
  PROFILE: "/profile",
  // LANDING: "/",
  NOTIFICATION: "/notification",
  NOTFOUND: "/notfound",
};
