import { BankInfo } from "@features/admin/reconcile/stores/reconcileStore";
import { Contact } from "../contact.type";
import { ContactActionType } from "./actionType";
import { PaginationParams } from "@constants/tableState";

export type ContactAction =
  | { type: ContactActionType.SET_LOADING; payload: boolean }
  | { type: ContactActionType.SET_ERROR; payload: any }
  | { type: ContactActionType.SET_DATA; payload: Contact[] }
  | {
      type: ContactActionType.SET_PAGINATION;
      payload: Partial<PaginationParams>;
    }
  | { type: ContactActionType.SET_BANKS; payload: BankInfo[] };
