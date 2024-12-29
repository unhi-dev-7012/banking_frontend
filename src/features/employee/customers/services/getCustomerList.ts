import { EROLE } from "../../../../constants/authorization";
import api from "../../../../utils/api";

export const getCustomers = async (
  page: number
): Promise<Record<string, any>> => {
  const response = await api.get("api/employee/v1/users", {
    params: {
      page,
      sort: "createdAt",
      direction: "desc",
      onlyCount: false,
      needTotalCount: true,
      role: EROLE.CUSTOMER,
    },
  });
  return response;
};
