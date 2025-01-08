import api from "@utils/api";
import { ReconcileStatistic } from "../stores/reconcileStore";

const API_ENPOINT = "/api/admin/v1/transactions/statistic/";

export const getStatistic = async (
  bankId: string,
  from: string,
  to: string
): Promise<ReconcileStatistic> => {
  const response = await api.get(`${API_ENPOINT}${bankId}`, {
    params: {
      from: from,
      to: to,
    },
  });

  return response.data;
};
