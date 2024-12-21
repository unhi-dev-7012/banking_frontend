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
    PROFILE: "/profile",
  },
  EMPLOYEE: {
    CUSTOMER: "/customer",
    CUSTOMER_LIST: "/customer/list",
    CUSTOMER_CREATE: "/customer/create",
    DEPOSIT: "/deposit",
    HISTORY: "/employee/history",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    EMPLOYEE: "/employee",
    EMPLOYEE_LIST: "/employee/list",
  },

  // General
  LOGIN: "/",
  // LANDING: "/",
  NOTIFICATION: "/notification",
  SETTING: "/setting",
  NOTFOUND: "/notfound",
};
