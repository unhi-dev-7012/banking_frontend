export interface Debt {
  id: string;
  debtorId: string;
  reminderId: string;
  amount: number;
  status: string;
  message: string;
  createdAt: string;
}
export enum DebtCategory {
  CREATED_BY_ME = "created-by-me",
  CREATED_FOR_ME = "created-for-me",
}

export enum DebtStatus {
  INDEBTED = "indebted",
  SETTLED = "settled",
  CANCELED = "canceled",
}

export const DebtTabItem = [
  { key: "created", label: "Nợ đã tạo" },
  { key: "received", label: "Nợ được nhắc" },
];
