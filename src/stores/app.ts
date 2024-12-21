import { create } from 'zustand';

type BreadcrumbItem = {
  title: string;
  path: string;
};

export type AppStore = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  isSiderCollapsed: boolean;
  toggleSider: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set(() => ({ breadcrumbs })),
  isSiderCollapsed: false,
  toggleSider: () => set((state) => ({ isSiderCollapsed: !state.isSiderCollapsed })),
}));
