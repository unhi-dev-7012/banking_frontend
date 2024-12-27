import { TableState } from "@constants/tableState";
import { Debt, DebtCategory } from "../debtType";
import { create } from "zustand";
import { fetchDebtData } from "../services/fetchDebtData";

interface DebtStore extends TableState<Debt> {
  category: DebtCategory;
  setCategory: (category: DebtCategory) => void;
  fetchTableData: () => Promise<void>;
}

export const useDebtStore = create<DebtStore>((set, get) => ({
  data: [],
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  category: DebtCategory.CREATED_BY_ME,
  setData: async (data) => {
    set({ data: data });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  setCategory: (category) => set({ category }),
  fetchTableData: async () => {
    const { pagination, category } = get();
    try {
      set({ loading: true });
      const response = await fetchDebtData({
        page: pagination.current,
        limit: pagination.pageSize,
        category,
      });
      set({
        pagination: { ...pagination, total: response.metadata.totalCount },
        data: response.data,
      });
    } catch (error) {
      console.error("[DebtStore]: ", error);
      set({ error: "Không thể tải dữ liệu nợ" });
    } finally {
      set({ loading: false });
    }
  },
}));
