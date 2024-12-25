import { TableState } from "@constants/tableState";
import { Employee } from "../employeeType";
import { create } from "zustand";
import { fetchTableData } from "@services/fetchTableData";

const API_ENPOINT = "api/admin/v1/users";

interface EmployeeTableState extends TableState<Employee> {}

export const useEmployeeTable = create<EmployeeTableState>((set, get) => ({
  data: [],
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 4,
    total: 0,
  },
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
    const { pagination } = get();
    try {
      set({ loading: true });
      const response = await fetchTableData<Employee>(API_ENPOINT, {
        page: pagination.current,
        limit: pagination.pageSize,
        role: "employee",
      });

      set({
        pagination: {
          ...pagination,
          total: response.metadata.totalCount,
        },
        data: response.data,
      });
    } catch (error) {
      console.error("[STORE]: ", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
