import { fetchTableData } from "@services/fetchTableData";
import { DebtApiEndpoints } from "../apiDebtEndpoint";
import { Debt, DebtCategory } from "../debtType";

interface FetchDebtParams {
  page: number;
  limit: number;
  category: DebtCategory;
}

export const fetchDebtData = async ({
  page,
  limit,
  category,
}: FetchDebtParams) => {
  try {
    const response = await fetchTableData<Debt>(DebtApiEndpoints.LIST_DEBTS, {
      page,
      limit,
      category,
    });
    return response;
  } catch (error) {
    console.error("Error fetching debt data: ", error);
    throw error;
  }
};
