import { TableState } from "@constants/tableState";
import { fetchTableData } from "@services/fetchTableData";
import { create } from "zustand";
import { getBanks } from "../services/getBankList";

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

interface ReconcileState extends TableState<Transaction> {
  bankId: string;
  banks: BankInfo[];
  selectedMonthStr: string;
  from: string;
  to: string;
  setSelectedMonth: (value: string) => void;
  setBankId: (value: string) => void;
  setBanks: () => Promise<void>;
}

const API_ENPOINT = "api/admin/v1/transactions/reconcile";

const defaultState = {
  data: [],
  banks: [],
  bankId: "",
  selectedMonthStr: "",
  from: "",
  to: "",
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
    });

    console.log(data);
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
    const data = await getBanks();
    set({
      banks: data,
    });
  },
}));
