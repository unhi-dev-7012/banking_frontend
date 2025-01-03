import { create } from "zustand";
import { getNotification } from "../services/fetchNotification";
import { NotificationType } from "../notificationType";
import { markAsReadNotifications } from "../services/markAsReadNotification";
import { countUnreadNotifications } from "../services/countUnreadNotification";

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
  unreads?: number;
  fetchNotification: () => Promise<void>;
  setPagination: (pagination: Partial<Pagination>) => void;
  setType: (type: NotificationType | undefined) => boolean | undefined;
  markAsRead: () => void;
  setUnread: (count: number) => Promise<boolean>;
}

export const useNotification = create<NotificationState>((set, get) => ({
  notifications: [],
  unreads: 0,
  success: undefined,
  loading: true,
  error: undefined,
  pagination: {
    current: 1,
    pageSize: 6,
    total: 0,
  },
  type: undefined,
  markAsRead: async () => {
    await markAsReadNotifications();
  },
  setUnread: async () => {
    let count = Number((await countUnreadNotifications()).data) ?? 0;
    set({ unreads: count });
    return true;
  },
  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));

    if (pagination.current === 1) {
      set({ type: undefined });
    }
  },
  setType: (type: NotificationType | undefined) => {
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
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
