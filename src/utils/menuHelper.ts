import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { EROLE } from "@constants/authorization";
import { getUserRole } from "./getUserRole";
import { checkRole } from "./checkRole";

export type MenuItem = Required<MenuProps>["items"][number];

export const getItem = ({
  key,
  label,
  path,
  requiredRoles = [],
}: {
  key: React.Key;
  label: React.ReactNode;
  path?: string;
  requiredRoles?: EROLE[];
}): MenuItem | null => {
  const navigate = useNavigate();
  const userRole = getUserRole(); // Lấy role của người dùng từ zustand store

  // Kiểm tra quyền truy cập của người dùng
  if (!checkRole(userRole, requiredRoles)) return null;
  return {
    key,
    label,
    onClick: () => {
      if (path) navigate(path);
    },
  };
};
