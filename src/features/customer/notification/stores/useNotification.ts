import { create } from "zustand";
import { getNotification } from "../services/fetchNotification";
import { NotificationType } from "../notificationType";

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}
interface NotificationState {
  notifications: Record<string, any>[];
  type?: NotificationType;
  loading: boolean;
  success?: string;
  error?: string;
  pagination: Pagination;
  fetchNotification: () => Promise<void>;
  setPagination: (pagination: Partial<Pagination>) => void;
  setType: (type: NotificationType) => boolean;
}

export const useNotification = create<NotificationState>((set, get) => ({
  notifications: [],
  success: undefined,
  loading: true,
  error: undefined,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  type: undefined,
  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));

    if (pagination.current === 1) {
      set({ type: undefined });
    }
  },
  setType: (type: NotificationType) => {
    set({ type: type });
    return true;
  },
  fetchNotification: async () => {
    set({ loading: true, error: undefined, success: undefined });

    try {
      const { pagination, type } = get();
      const response = await getNotification(
        pagination.current,
        pagination.pageSize,
        type
      );

      if (response && response.errorMessage) {
        set({
          loading: false,
          error: response.errorMessage,
        });
      } else {
        set({
          notifications: response.data,
          pagination: {
            ...pagination,
            total: response.metadata.totalCount,
          },
          loading: false,
        });
      }

      console.log(response.data);
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
