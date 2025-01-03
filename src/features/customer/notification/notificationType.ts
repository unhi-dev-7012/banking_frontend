export enum NotificationType {
  DEBT_CREATED_FOR_YOU = "debt_created_for_you",
  BALANCE_UPDATE = "balance_update",
  DEBT_CANCEL = "debt_cancel",
  DEBT_PAID = "debt_paid",
}

export const NotificationTabs = [
  { label: "Tất cả", key: "all" },
  { label: "Nợ mới", key: "debt_created_for_you" },
  { label: "Biến động số dư", key: "balance_update" },
  { label: "Hủy nợ", key: "debt_cancel" },
  { label: "Trả nợ", key: "debt_paid" },
];
