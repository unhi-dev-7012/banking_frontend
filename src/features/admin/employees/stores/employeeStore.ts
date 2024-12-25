import { create } from "zustand";
import { Employee } from "../employeeType";
import { listEmployees } from "../services/listEmployees";

interface EmployeesState {
  employees: Employee[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  listEmployees: (current: number, pageSize: number) => Promise<void>;
}

export const useEmployeeStore = create<EmployeesState>((set) => ({
  employees: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  listEmployees: async (current: number, pageSize: number) => {
    try {
      const response = await listEmployees(current, pageSize);
      set({
        employees: response.data,
        pagination: {
          current: current,
          pageSize: pageSize,
          total: response.metadata.totalCount,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
