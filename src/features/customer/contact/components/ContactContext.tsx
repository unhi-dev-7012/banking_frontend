import { createContext } from "react";
import { ContactState } from "../contact.state";
import { ContactAction } from "../reducer/action";
import { PaginationParams } from "@constants/tableState";
import { BankInfo } from "@features/admin/reconcile/stores/reconcileStore";
import { TablePaginationConfig } from "antd";

export type ContactContextType = {
  state: ContactState;
  dispatch: (action: ContactAction) => void;
  fetchContact: (
    banks: BankInfo[],
    pagination: TablePaginationConfig
  ) => Promise<void>;
  setPagination: (pagination: Partial<PaginationParams>) => void;
  fetchBanks: () => Promise<BankInfo[]>;
};

export const defaultState: ContactState = {
  banks: [],
  data: [],
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};
export const ContactContext = createContext<ContactContextType>({
  state: defaultState,
  dispatch: () => {},
  fetchContact: async () => {},
  setPagination: () => {},
  fetchBanks: async () => {
    return [];
  },
});
