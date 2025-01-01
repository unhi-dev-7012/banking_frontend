import { BankInfo } from "@features/admin/reconcile/stores/reconcileStore";
import api from "@utils/api";

const API_ENDPOINT = "api/customer/v1/banks";

export const getBanks = async (): Promise<BankInfo[]> => {
  const response = await api.get(API_ENDPOINT, {
    params: {
      page: 1,
      limit: 50,
      sort: "createdAt",
      direction: "desc",
    },
  });

  return response.data.map((datum: Record<string, unknown>) => ({
    code: datum.code,
    name: datum.name,
    shortName: datum.shortName,
    id: datum.id,
  }));
};
