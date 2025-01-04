import { create } from "zustand";
import {
  TransactionStatus,
  TransactionCategory,
  getTransactions,
} from "../services/transactionHistory";

interface TransactionHistoryState {
  transactionHistory: Record<string, any>[];
  loading: boolean;
  errorMessage?: string;
  category?: TransactionCategory;
  pagination: {
    current: 1;
    pageSize: 6;
    total: 0;
  };
  fetchTransactionHistory: (
    status: TransactionStatus | undefined,
    bankId: string | undefined
  ) => Promise<void>;
  setPagination: (pagination: any) => void;
  setCategory: (category: TransactionCategory | undefined) => void;
}

export const useTransactionHistory = create<TransactionHistoryState>(
  (set, get) => ({
    transactionHistory: [],
    pagination: {
      current: 1,
      pageSize: 6,
      total: 0,
    },
    loading: false,
    category: undefined,
    setPagination: (pagination) =>
      set((state) => ({
        pagination: { ...state.pagination, ...pagination },
      })),
    setCategory: (category) => set({ category }),
    fetchTransactionHistory: async (
      status: TransactionStatus | undefined,
      bankId: string | undefined
    ) => {
      set({
        loading: true,
        errorMessage: undefined,
      });

      const { pagination, category } = get();

      try {
        const response = await getTransactions(
          pagination.current,
          pagination.pageSize,
          status,
          category,
          bankId
        );

        if (response && response.errorMessage) {
          set({
            loading: false,
            errorMessage: response.errorMessage,
          });
        } else {
          set({
            transactionHistory: response.data,
            pagination: {
              ...pagination,
              total: response.metadata.totalCount,
            },
            loading: false,
          });
        }
      } catch (error: any) {
        set({ loading: false, errorMessage: error.message });
      }
    },
  })
);
