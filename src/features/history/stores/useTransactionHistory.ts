import { create } from "zustand";
import {
  TransactionStatus,
  TransactionCategory,
  getTransactions,
} from "../services/customerHistory";

interface TransactionHistoryState {
  transactionHistory: Record<string, any>;
  isLoading: boolean;
  errorMessage?: string;
  fetchTransactionHistory: (
    page: number,
    status: TransactionStatus | undefined,
    category: TransactionCategory | undefined,
    userId: string | undefined,
    bankId: string | undefined
  ) => Promise<void>;
}

export const useHistory = create<TransactionHistoryState>((set) => ({
  transactionHistory: {
    data: [],
    metadata: {
      page: 0,
      totalCount: 0,
    },
  },
  isLoading: false,
  fetchTransactionHistory: async (
    page: number,
    status: TransactionStatus | undefined,
    category: TransactionCategory | undefined,
    userId: string | undefined,
    bankId: string | undefined
  ) => {
    set({
      isLoading: true,
      errorMessage: undefined,
    });
    const response = await getTransactions(
      page,
      status,
      category,
      userId,
      bankId
    );

    response
      ? set({ transactionHistory: response, isLoading: false })
      : set({
          transactionHistory: {
            data: [],
            metadata: {
              page: 0,
              totalCount: 0,
            },
          },
          errorMessage: "Failed to fetch transaction history",
          isLoading: false,
        });
  },
}));
