import { create } from "zustand";
import { getDataDashboard } from "../services/getDataDashboard";
import { getMoneyFlowData } from "../services/getMoneyFlowData";

interface DashboardState {
  loading: boolean;
  error: string | null;
  data: {
    recentTransactions: Transaction[];
    debtCount: DebtCount;
  } | null;
  moneyFlow: MoneyFlowData | undefined;
  mode: string; // Add mode to state
  setMode: (mode: string) => void; // Action to update mode
  fetchDashboardDataCard: () => Promise<void>;
  fetchMoneyFlowData: () => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set, get) => ({
  loading: false,
  error: null,
  data: null,
  moneyFlow: undefined,
  mode: "weekly",
  setMode: (mode: string) => set({ mode }),

  fetchDashboardDataCard: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDataDashboard();
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Lỗi không xác định", loading: false });
    }
  },
  fetchMoneyFlowData: async () => {
    set({ error: null });
    try {
      const currentMode = get().mode;
      const moneyFlow = await getMoneyFlowData(currentMode); // Pass mode as a parameter
      set({ moneyFlow });
    } catch (error: any) {
      set({
        error: error.message || "An unknown error occurred",
        loading: false,
      });
    }
  },
}));

export default useDashboardStore;

export interface Transaction {
  id: string;
  date: string;
  status: string;
  category: string;
  amount: number;
  message: string;
  relatedUser: {
    name: string;
    bankAccountId: string;
    bankName: string;
  };
}

export interface MoneyFlowItem {
  time: string;
  value: number;
  type: string;
}

export interface MoneyFlowData {
  totalTransactionData: MoneyFlowItem[];
  byCategory: {
    totalIncoming: MoneyFlowItem[];
    totalOutcoming: MoneyFlowItem[];
  };
}

interface DebtCount {
  totalDebtCreatedCurrentMonth: number;
  totalPaidCurrentMonth: number;
  totalBePaidCurrentMonth: number;
  debtCreationRate: number;
  paidRate: number;
  bePaidRate: number;
}
