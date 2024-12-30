import { TableState } from "@constants/tableState";
import {
  CreateDebtFormValue,
  Debt,
  DebtCategory,
  Debtor,
  DebtStatus,
} from "../debtType";
import { create } from "zustand";
import { fetchDebtData } from "../services/fetchDebtData";
import { createDebt } from "../services/createDebt";
import { message } from "antd";
import { getAllDebtor } from "../services/getAllDebtor";
import { cancelDebt } from "../services/cancelDebt";

interface DebtStore extends TableState<Debt> {
  category: DebtCategory;
  debtorList: Debtor[];
  setCategory: (category: DebtCategory) => void;
  fetchTableData: () => Promise<void>;
  fetchDebtorList: () => Promise<void>;
  createDebt: (values: CreateDebtFormValue) => Promise<void>;
  cancelDebt: (debtId: string) => Promise<void>;
}

export const useDebtStore = create<DebtStore>((set, get) => ({
  data: [],
  debtorList: [],
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
  fetchDebtorList: async () => {
    try {
      const response = await getAllDebtor();

      const uniqueDebtors = response.debtors.reduce(
        (acc: Debtor[], debt: Debtor) => {
          // Check if the debtorId already exists in the accumulator
          if (!acc.some((debtor) => debtor.debtorId === debt.debtorId)) {
            acc.push({
              debtorId: debt.debtorId,
              debtorFullName: debt.debtorFullName,
            });
          }
          return acc;
        },
        []
      );
      set({ debtorList: uniqueDebtors });
    } catch (error) {
      set({ error: "Không thể tải danh sách người nhận nợ" });
    }
  },
  // Create a new debt and update the state
  createDebt: async (values: CreateDebtFormValue) => {
    const { data, pagination } = get();
    try {
      set({ loading: true });

      const newDebt = await createDebt(values);
      console.log("mew deb", newDebt);

      set(() => ({
        data: [newDebt, ...data],
        pagination: { ...pagination, total: pagination.total + 1 },
        error: null,
      }));
      set({ error: null });

      message.success("Tạo nợ thành công!");
    } catch (error: any) {
      console.error("[DebtStore]: ", error);
      set({ error: error.message || "Tạo nợ thất bại" });

      message.error(error.message || "Tạo nợ thất bại");
    } finally {
      set({ loading: false });
    }
  },
  cancelDebt: async (debtId: string) => {
    const { data } = get();
    try {
      set({ loading: true });

      const isCancelled = await cancelDebt(debtId);

      if (isCancelled) {
        const updatedData = data.map((debt) =>
          debt.id === debtId ? { ...debt, status: DebtStatus.CANCELED } : debt
        );

        set({
          data: updatedData,
        });

        message.success("Nợ đã được hủy!");
      }
    } catch (error: any) {
      console.error("[DebtStore]: ", error);
      set({ error: error.message || "Hủy nợ thất bại" });
      message.error(error.message || "Hủy nợ thất bại");
    } finally {
      set({ loading: false });
    }
  },
}));
