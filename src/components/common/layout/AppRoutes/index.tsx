import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Spinner } from "@components/common/Spinner";
import { ROUTES_PATH } from "@constants/path";
import { EROLE } from "@constants/authorization";
import ProtectedRoute from "@routes/ProtectedRoute";

const NotFoundScreen = lazy(
  () => import("@screens/authentication/NotFoundScreen")
);
const NotificationScreen = lazy(
  () => import("@screens/authentication/NotificationScreen")
);

const CustomerDashboard = lazy(
  () => import("@screens/customer/CustomerDashboardScreen")
);

const CustomerAccounts = lazy(
  () => import("@screens/customer/CustomerAccountListScreen")
);
const CustomerTransferInternal = lazy(
  () => import("@screens/customer/transfer/InternalTransferScreen")
);
const CustomerTransferExternal = lazy(
  () => import("@screens/customer/transfer/ExternalTransferScreen")
);
const CustomerContacts = lazy(
  () => import("@screens/customer/ContactListScreen")
);
const CustomerDebts = lazy(
  () => import("@screens/customer/debt/DebtListScreen")
);
const CustomerSettleDebt = lazy(
  () => import("@screens/customer/debt/DebtSettleScreen")
);
const CustomerHistory = lazy(
  () => import("@screens/customer/CustomerHistoryScreen")
);
const Profile = lazy(() => import("@screens/authentication/ProfileScreen"));

const EmployeeCustomerList = lazy(
  () => import("@screens/employee/accounts/AccountListScreen")
);
const EmployeeCustomerCreate = lazy(
  () => import("@screens/employee/accounts/AccountCreateScreen")
);
const EmployeeDeposit = lazy(() => import("@screens/employee/DepositScreen"));
const EmployeeHistory = lazy(() => import("@screens/employee/HistoryScreen"));

const AdminDashboard = lazy(
  () => import("@screens/admin/AdminDashboardScreen")
);
const AdminEmployeeList = lazy(
  () => import("@screens/admin/EmployeeListScreen")
);

const createProtectedRoute = (
  path: string,
  allowedRoles: EROLE[],
  Component: React.FC
) => (
  <Route
    path={path}
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component />
      </ProtectedRoute>
    }
  />
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      {/* Common */}
      {createProtectedRoute(
        ROUTES_PATH.NOTIFICATION,
        [EROLE.CUSTOMER, EROLE.ADMIN, EROLE.EMPLOYEE],
        NotificationScreen
      )}
      {createProtectedRoute(
        ROUTES_PATH.PROFILE,
        [EROLE.CUSTOMER, EROLE.ADMIN, EROLE.EMPLOYEE],
        Profile
      )}

      {/* Customer Routes */}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.DASHBOARD,
        [EROLE.CUSTOMER],
        CustomerDashboard
      )}

      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.ACCOUNT,
        [EROLE.CUSTOMER],
        () => (
          <Navigate to={ROUTES_PATH.CUSTOMER.ACCOUNT_LIST} replace />
        )
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.ACCOUNT_LIST,
        [EROLE.CUSTOMER],
        CustomerAccounts
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.TRANSFER,
        [EROLE.CUSTOMER],
        () => (
          <Navigate to={ROUTES_PATH.CUSTOMER.INTERNAL_TRANSFER} replace />
        )
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.INTERNAL_TRANSFER,
        [EROLE.CUSTOMER],
        CustomerTransferInternal
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.EXTERNAL_TRANSFER,
        [EROLE.CUSTOMER],
        CustomerTransferExternal
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.CONTACT,
        [EROLE.CUSTOMER],
        () => (
          <Navigate to={ROUTES_PATH.CUSTOMER.CONTACT_LIST} replace />
        )
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.CONTACT_LIST,
        [EROLE.CUSTOMER],
        CustomerContacts
      )}
      {createProtectedRoute(ROUTES_PATH.CUSTOMER.DEBT, [EROLE.CUSTOMER], () => (
        <Navigate to={ROUTES_PATH.CUSTOMER.DEBT_LIST} replace />
      ))}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.DEBT_LIST,
        [EROLE.CUSTOMER],
        CustomerDebts
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.SETTLE_DEBT,
        [EROLE.CUSTOMER],
        CustomerSettleDebt
      )}
      {createProtectedRoute(
        ROUTES_PATH.CUSTOMER.HISTORY,
        [EROLE.CUSTOMER],
        CustomerHistory
      )}
      {/* Employee Routes */}
      {createProtectedRoute(
        ROUTES_PATH.EMPLOYEE.CUSTOMER,
        [EROLE.EMPLOYEE],
        () => (
          <Navigate to={ROUTES_PATH.EMPLOYEE.CUSTOMER_LIST} replace />
        )
      )}
      {createProtectedRoute(
        ROUTES_PATH.EMPLOYEE.CUSTOMER_LIST,
        [EROLE.EMPLOYEE],
        EmployeeCustomerList
      )}
      {createProtectedRoute(
        ROUTES_PATH.EMPLOYEE.CUSTOMER_CREATE,
        [EROLE.EMPLOYEE],
        EmployeeCustomerCreate
      )}
      {createProtectedRoute(
        ROUTES_PATH.EMPLOYEE.DEPOSIT,
        [EROLE.EMPLOYEE],
        EmployeeDeposit
      )}
      {createProtectedRoute(
        ROUTES_PATH.EMPLOYEE.HISTORY,
        [EROLE.EMPLOYEE],
        EmployeeHistory
      )}
      {/* Admin Routes */}

      {createProtectedRoute(
        ROUTES_PATH.ADMIN.DASHBOARD,
        [EROLE.ADMIN],
        AdminDashboard
      )}

      {createProtectedRoute(
        ROUTES_PATH.ADMIN.EMPLOYEE_LIST,
        [EROLE.ADMIN],
        AdminEmployeeList
      )}
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </Suspense>
);
