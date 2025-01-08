import { TableState } from "@constants/tableState";
import { fetchTableData } from "@services/fetchTableData";
import { create } from "zustand";
import { getBanks } from "../services/getBankList";
import { getStatistic } from "../services/getStatistic";

export interface Transaction {
  id: string;
  remitterId: string;
  remitterName: string;
  remitterBankId: string;
  remitterBankName: string;
  beneficiaryId: string;
  beneficiaryName: string;
  beneficiaryBankId: string;
  beneficiaryBankName: string;
  message: string;
  amount: string;
  type: string;
  transactionFee: number;
  completedAt: Date;
}

export interface BankInfo {
  code: string;
  name: string;
  shortName: string;
  id: string;
  label: string;
}

export interface ReconcileStatistic {
  outcomingAmount: number;
  incomingAmount: number;
  transactionCount: number;
}

interface ReconcileState extends TableState<Transaction> {
  bankId: string;
  banks: BankInfo[];
  selectedMonthStr: string;
  from: string;
  to: string;
  statistic: ReconcileStatistic;
  setSelectedMonth: (value: string) => void;
  setBankId: (value: string) => void;
  setBanks: () => Promise<void>;
  fetchStatistic: () => Promise<void>;
}

const API_ENPOINT = "api/admin/v1/transactions/reconcile";

const defaultState = {
  data: [],
  banks: [],
  bankId: "",
  selectedMonthStr: "",
  from: "",
  to: "",
  statistic: {
    outcomingAmount: 0,
    incomingAmount: 0,
    transactionCount: 0,
  },
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

const getBankName = (banks: BankInfo[], id: string) => {
  return banks.find((item) => item.id === id)?.name || "";
};

export const useReconcile = create<ReconcileState>((set, get) => ({
  ...defaultState,
  setData: async (data) => {
    set({ data: data });
  },
  setLoading: (loading) => {
    set({ loading: loading });
  },
  setError: (error) => {
    set({ error: error });
  },
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
  fetchTableData: async () => {
    set({ loading: true });
    const { pagination, from, to, bankId, banks } = get();

    if (from === "" || to === "" || bankId === "") return;
    const response = await fetchTableData<Transaction>(API_ENPOINT, {
      page: pagination.current,
      limit: pagination.pageSize,
      from: from,
      to: to,
      bankId: bankId,
      sort: "completedAt",
      direction: "desc",
      column: "completedAt",
    });

    const data = response.data.map((datum) => ({
      id: datum.id,
      remitterId: datum.remitterId,
      remitterName: datum.remitterName,
      remitterBankId: datum.remitterBankId,
      remitterBankName: getBankName(banks, datum.remitterBankId),
      beneficiaryId: datum.beneficiaryId,
      beneficiaryName: datum.beneficiaryName,
      beneficiaryBankId: datum.beneficiaryBankId,
      beneficiaryBankName: getBankName(banks, datum.beneficiaryBankId),
      message: datum.message,
      amount: datum.amount,
      type: datum.type,
      transactionFee: datum.transactionFee,
      completedAt: datum.completedAt,
    }));

    set({
      data: data,
      loading: false,
    });
  },
  setSelectedMonth: (value) => {
    const [year, month] = value.split("-").map(Number);

    // Create the first day of the month
    const startDate = new Date(year, month - 1, 1);

    // Create the last day of the month
    const endDate = new Date(year, month, 0);

    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    set({
      from: startDate.toISOString(),
      to: endDate.toISOString(),
      selectedMonthStr: value,
    });
  },
  setBankId: (value) => {
    set({
      bankId: value,
    });
  },
  setBanks: async () => {
    set({ loading: true });
    const data = await getBanks();
    set({
      loading: false,
      banks: data,
    });
  },
  fetchStatistic: async () => {
    const { from, to, bankId } = get();

    if (from === "" || to === "" || bankId === "") return;
    set({ loading: true });

    if (bankId === "") {
      set({ loading: false });
      return;
    }
    const data = await getStatistic(bankId, from, to);
    set({
      statistic: data,
      loading: false,
    });
  },
}));
