export interface PaginationParams {
  current: number;
  pageSize: number;
  total: number;
}

export interface TableState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: PaginationParams;
  setData: (data: T[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Partial<PaginationParams>) => void;
  fetchTableData: () => Promise<void>;
}
