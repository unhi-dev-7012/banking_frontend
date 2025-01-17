import api from "@utils/api";
import { BankInfo } from "../stores/reconcileStore";

const API_ENPOINT = "api/admin/v1/banks";

export const getBanks = async (): Promise<BankInfo[]> => {
  const response = await api.get(API_ENPOINT, {
    params: { page: 1, limit: 50, sort: "createdAt", direction: "desc" },
  });
  return response.data.map((datum: Record<string, unknown>) => ({
    code: datum.code,
    name: datum.name,
    shortName: datum.shortName,
    id: datum.id,
    label: `${datum.code} - ${datum.name}`,
  }));
};
