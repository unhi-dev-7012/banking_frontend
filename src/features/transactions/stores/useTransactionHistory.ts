import { create } from "zustand";
import {
  TransactionStatus,
  TransactionCategory,
  getTransactions,
} from "../services/customerTransactionHistory";

interface TransactionHistoryState {
  transactionHistory: Record<string, any>[];
  loading: boolean;
  errorMessage?: string;
  pagination: {
    current: 1;
    pageSize: 8;
    total: 0;
  };
  fetchTransactionHistory: (
    status: TransactionStatus | undefined,
    category: TransactionCategory | undefined,
    bankId: string | undefined
  ) => Promise<void>;
  setPagination: (pagination: any) => void;
}

export const useHistory = create<TransactionHistoryState>((set, get) => ({
  transactionHistory: [],
  pagination: {
    current: 1,
    pageSize: 8,
    total: 0,
  },
  loading: false,
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  fetchTransactionHistory: async (
    status: TransactionStatus | undefined,
    category: TransactionCategory | undefined,
    bankId: string | undefined
  ) => {
    set({
      loading: true,
      errorMessage: undefined,
    });
    const { current } = get().pagination;
    const response = await getTransactions(current, status, category, bankId);

    response && !response.errorMessage
      ? set({ transactionHistory: response.data, loading: false })
      : set({
          transactionHistory: [],
          errorMessage: "Failed to fetch transaction history",
          loading: false,
        });
  },
}));
