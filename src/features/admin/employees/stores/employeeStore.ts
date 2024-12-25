import { create } from "zustand";
import { CreateEmployeeForm, Employee } from "../employeeType";
import { listEmployees } from "../services/listEmployees";
import { blockEmployee } from "../services/blockEmployee";
import { createEmployee } from "../services/createEmployee";

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
  };
  totalItems: number;
  listEmployees: () => Promise<void>;
  blockEmployee: (id: string, isBlocked: boolean) => Promise<void>;
  createEmployee: (formData: CreateEmployeeForm) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setPagination: (current: number, pageSize: number) => void;
}

export const useEmployeeStore = create<EmployeesState>((set, get) => ({
  employees: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  totalItems: 0,
  loading: false,
  listEmployees: async () => {
    try {
      set({ loading: true });
      const { pagination } = get();
      const response = await listEmployees(
        pagination.current,
        pagination.pageSize
      );
      set({
        employees: response.data,
        loading: false,
        totalItems: response.metadata.totalCount,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },
  blockEmployee: async (id: string, isBlocked: boolean) => {
    set({ loading: true });
    await blockEmployee(id, isBlocked);
    set({ loading: false });
  },
  createEmployee: async (formData: CreateEmployeeForm) => {
    set({ loading: true });
    await createEmployee(formData);
    set({ loading: false });
  },
  setLoading: (loading: boolean) => {
    set({
      loading: loading,
    });
  },
  setPagination: (current, pageSize) => {
    set({
      pagination: {
        current: current,
        pageSize: pageSize,
      },
    });
  },
}));
