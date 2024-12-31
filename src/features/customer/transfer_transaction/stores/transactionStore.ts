import { create } from "zustand";
import {
  ContactUserInfo,
  CreateTransactionPayload,
  GetTransactionResponse,
  Transaction,
  VerifyOtpPayload,
} from "../transactionType";
import createTransaction from "../services/createTransaction";
import verifyOtp from "../services/verifyOtp";
import getTransactionDetails from "../services/getTransactionDetails";
import { getAllContact } from "../services/getAllContact";

interface TransactionState {
  transaction: Transaction | null;
  createLoading: boolean;
  verifyLoading: boolean;
  fetchLoading: boolean;
  error: string | null;
  contactList: ContactUserInfo[];
  transactionDetailsRespones: GetTransactionResponse | null;

  createTransaction: (payload: CreateTransactionPayload) => Promise<void>;
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  fetchTransaction: (id: string) => Promise<void>;
  fetchAllContact: () => Promise<void>;
}

const useTransactionStore = create<TransactionState>((set) => ({
  transaction: null,
  createLoading: false,
  verifyLoading: false,
  fetchLoading: false,
  error: null,
  contactList: [],
  transactionDetailsRespones: null,

  createTransaction: async (payload) => {
    try {
      set({ createLoading: true, error: null });
      const response = await createTransaction.execute(payload);
      set({ transaction: response }); // Lưu giao dịch mới vào 'transaction'
    } catch (error: any) {
      console.log("Lỗi khi tạo giao dịch: ", error);
      set({
        error: error?.message || "Không thể tạo giao dịch.",
      });
    } finally {
      set({ createLoading: false });
    }
  },

  verifyOtp: async (payload) => {
    try {
      set({ verifyLoading: true, error: null });
      await verifyOtp.execute(payload);
    } catch (error: any) {
      console.log("Lỗi khi xác thực OTP: ", error);
      set({ error: error?.message || "Không thể xác thực OTP." });
    } finally {
      set({ verifyLoading: false });
    }
  },

  fetchTransaction: async (id) => {
    try {
      set({ fetchLoading: true, error: null });
      const response = await getTransactionDetails.execute(id);
      set({ transaction: response }); // Cập nhật thông tin giao dịch
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin giao dịch: ", error);
      set({
        error: error?.message || "Không thể lấy thông tin giao dịch.",
      });
    } finally {
      set({ fetchLoading: false });
    }
  },

  fetchAllContact: async () => {
    try {
      set({ fetchLoading: true, error: null });
      const response = await getAllContact();
      console.log("response", response);
      set({ contactList: response });
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin danh bạ: ", error);
      set({
        error: error?.message || "Không thể lấy thông tin danh bạ",
      });
    } finally {
      set({ fetchLoading: false });
    }
  },
}));

export default useTransactionStore;
