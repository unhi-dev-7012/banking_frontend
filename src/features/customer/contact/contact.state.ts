import { PaginationParams } from "@constants/tableState";
import { Contact } from "./contact.type";
import { BankInfo } from "@features/admin/reconcile/stores/reconcileStore";

export interface ContactState {
  banks: BankInfo[];
  data: Contact[];
  loading: boolean;
  error: string | null;
  pagination: PaginationParams;
}
