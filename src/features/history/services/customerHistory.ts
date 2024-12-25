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
  userId: string | undefined,
  bankId: string | undefined
): Promise<Record<string, any> | null | undefined> => {
  const { role } = useAuthStore.getState();

  if (!role) {
    return null;
  }

  let url = "";

  switch (role) {
    case "admin":
      url = "/api/admins/v1/trnsactions";
      break;
    case "employee":
      url = "/api/employees/v1/tranactions";
      break;
    case "customer":
      url = "/api/customers/v1/transactions";
      break;
    default:
      return null;
  }
  console.log("url", url);
  const response = await api.get(url, {
    params: {
      page,
      status,
      category,
      userId,
      bankId,
      sort: "createdAt",
      direction: "desc",
      onlyCount: false,
      needTotalCount: true,
    },
  });

  return response;
};
