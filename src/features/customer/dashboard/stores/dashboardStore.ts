import { create } from "zustand";
import { getDataDashboard } from "../services/getDataDashboard";

interface DashboardState {
  loading: boolean;
  error: string | null;
  data: {
    recentTransactions: Transaction[];
    debtCount: DebtCount;
  } | null;
  fetchDashboardData: () => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set) => ({
  loading: false,
  error: null,
  data: null,
  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDataDashboard();
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Lỗi không xác định", loading: false });
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

interface DebtCount {
  totalDebtCreatedCurrentMonth: number;
  totalPaidCurrentMonth: number;
  totalBePaidCurrentMonth: number;
  debtCreationRate: number;
  paidRate: number;
  bePaidRate: number;
}
