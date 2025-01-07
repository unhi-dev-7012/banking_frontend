import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "@stores/app";
import { ROUTES_PATH } from "@constants/path";

const routeTitles: Record<string, string> = {
  // General
  [ROUTES_PATH.LOGIN]: "Đăng nhập",
  [ROUTES_PATH.NOTIFICATION]: "Thông báo",

  //Customer
  [ROUTES_PATH.CUSTOMER.DASHBOARD]: "Trang chủ",
  [ROUTES_PATH.CUSTOMER.ACCOUNT]: "Tài khoản",
  [ROUTES_PATH.CUSTOMER.ACCOUNT_LIST]: "Danh sách tài khoản",
  [ROUTES_PATH.CUSTOMER.TRANSFER]: "Chuyển tiền",
  [ROUTES_PATH.CUSTOMER.INTERNAL_TRANSFER]: "Chuyển tiền trong ngân hàng",
  [ROUTES_PATH.CUSTOMER.EXTERNAL_TRANSFER]: "Chuyển tiền liên ngân hàng",
  [ROUTES_PATH.CUSTOMER.CONTACT]: "Danh bạ",
  [ROUTES_PATH.CUSTOMER.CONTACT_LIST]: "Danh sách người nhận",
  [ROUTES_PATH.CUSTOMER.DEBT]: "Quản lý nợ",
  [ROUTES_PATH.CUSTOMER.DEBT_LIST]: "Danh sách nợ",
  [ROUTES_PATH.CUSTOMER.SETTLE_DEBT]: "Thanh toán nợ",
  [ROUTES_PATH.CUSTOMER.HISTORY]: "Lịch sử giao dịch",
  [ROUTES_PATH.PROFILE]: "Thông tin",

  //EMPLOYEE
  [ROUTES_PATH.EMPLOYEE.CUSTOMER]: "Quản lý khách hàng",
  [ROUTES_PATH.EMPLOYEE.CUSTOMER_LIST]: "Danh sách khách hàng",
  [ROUTES_PATH.EMPLOYEE.HISTORY]: "Lịch sử giao dịch",

  //ADMIN
  [ROUTES_PATH.ADMIN.DASHBOARD]: "Trang chủ",
  [ROUTES_PATH.ADMIN.EMPLOYEE]: "Quản lý nhân viên",
  [ROUTES_PATH.ADMIN.EMPLOYEE_LIST]: "Danh sách nhân viên",
};

export const useBreadcrumb = () => {
  const location = useLocation();
  const { setBreadcrumbs } = useAppStore();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: routeTitles[path] || segment,
        path,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [location, setBreadcrumbs]);
};
