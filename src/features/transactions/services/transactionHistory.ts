import { useAuthStore } from "../../auth/stores/authStore";
import api from "@utils/api";

export enum TransactionCategory {
  INCOMING = "incoming",
  OUTCOMING = "outcoming",
  ALL = "all",
  DEBT = "debt",
}

export enum TransactionStatus {
  SUCCESS = "success",
  FAILED = "failed",
  CREATED = "created",
  PROCESSING = "processing",
}

export const getTransactions = async (
  page: number,
  status: TransactionStatus | undefined,
  category: TransactionCategory | undefined,
  bankId: string | undefined
): Promise<Record<string, any> | null | undefined> => {
  const { role } = useAuthStore.getState();

  if (!role) {
    return null;
  }

  let url = "";

  switch (role) {
    case "admin":
      url = "/api/admin/v1/transactions";
      break;
    case "employee":
      url = "/api/employee/v1/transactions";
      break;
    case "customer":
      url = "/api/customer/v1/transactions";
      break;
    default:
      return null;
  }
  const response = await api.get(url, {
    params: {
      page,
      status,
      category,
      bankId,
      sort: "createdAt",
      direction: "desc",
      onlyCount: false,
      needTotalCount: true,
    },
  });

  return response;
};
