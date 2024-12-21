import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/stores/authStore";
import { ROUTES_PATH } from "@constants/path";

interface IProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={ROUTES_PATH.LOGIN} replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role!))
    return <Navigate to={"*"} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
