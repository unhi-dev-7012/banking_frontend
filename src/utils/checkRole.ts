// checkRole.ts
import { EROLE } from "@constants/authorization";

// Utility để kiểm tra quyền của người dùng
export const checkRole = (
  userRole: string | null,
  requiredRoles: EROLE[]
): boolean => {
  if (!userRole) return false; // Nếu không có role, không có quyền truy cập
  return requiredRoles.includes(userRole as EROLE);
};
