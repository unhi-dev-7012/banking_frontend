import { create } from "zustand";
import { getCustomers } from "../services/getCustomerList";
import { createCustomer } from "../services/createCustomer";
import { CreateCustomerForm } from "../employeeType";
import { depositCustomer } from "../services/deposit";

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface CustomerManagementState {
  customers: Record<string, any>[];
  loading: boolean;
  success?: string;
  error?: string;
  pagination: Pagination;
  fetchCustomers: () => Promise<void>;
  setPagination: (pagination: Partial<Pagination>) => void;
  createCustomer: (values: CreateCustomerForm) => Promise<void>;
  deposit: (id: string, email: string, amount: number) => Promise<void>;
}

export const useCustomerManagement = create<CustomerManagementState>(
  (set, get) => ({
    customers: [],
    success: undefined,
    loading: false,
    error: undefined,
    pagination: {
      current: 1,
      pageSize: 8,
      total: 0,
    },
    fetchCustomers: async () => {
      set({ loading: true, error: undefined, success: undefined });
      try {
        const { pagination } = get();
        const response = await getCustomers(
          pagination.current,
          pagination.pageSize
        );

        if (response && response.errorMessage) {
          set({
            loading: false,
            error: response.errorMessage,
          });
        } else {
          set({
            customers: response.data,
            pagination: {
              ...pagination,
              total: response.metadata.totalCount,
            },
            loading: false,
          });
        }
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    },
    setPagination: (pagination) =>
      set((state) => ({
        pagination: { ...state.pagination, ...pagination },
      })),
    createCustomer: async (values: CreateCustomerForm) => {
      set({ loading: true, error: undefined, success: undefined });
      try {
        await createCustomer(values);
        await get().fetchCustomers();
        set({ success: "Thêm khách hàng thành công" });
        set({ loading: false });
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    },
    deposit: async (id: string, email: string, amount: number) => {
      set({ loading: true, error: undefined, success: undefined });
      try {
        await depositCustomer(id, email, amount);
        await get().fetchCustomers();
        set({ success: `Nạp tiền vào tài khoản ${id} thành công` });
        set({ loading: false });
      } catch (error: any) {
        set({ loading: false, error: error.message });
      }
    },
  })
);
