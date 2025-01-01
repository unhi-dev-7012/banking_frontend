import { create } from "zustand";
import {
  Bank,
  ContactUserInfo,
  CreateTransactionPayload,
  Transaction,
  VerifyOtpPayload,
} from "../transactionType";
import createInternalTransaction from "../services/createInternalTransaction";
import verifyOtp from "../services/verifyOtp";
import getTransactionDetails from "../services/getTransactionDetails";
import { getAllContact } from "../services/getAllContact";
import getBankAccountInfo, {
  BankAccountInfo,
} from "../services/getBankAccountInfo";
import { getAllBank } from "../services/getAllBank";

interface TransactionState {
  transaction: Transaction | null;
  bankAccountInfo: BankAccountInfo | null;
  createLoading: boolean;
  verifyLoading: boolean;
  fetchLoading: boolean;
  fetchError: string | null;
  contactList: ContactUserInfo[];
  transactionDetailsRespones: Transaction | null;
  banks: Bank[];

  createTransaction: (payload: CreateTransactionPayload) => Promise<void>;
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  fetchTransaction: (id: string) => Promise<void>;
  fetchAllContact: () => Promise<void>;
  fetchBankAccountInfo: () => Promise<void>;
  fetchAllBank: () => Promise<void>;
}

const useTransactionStore = create<TransactionState>((set) => ({
  transaction: null,
  bankAccountInfo: null,
  createLoading: false,
  verifyLoading: false,
  fetchLoading: false,
  fetchError: null,
  contactList: [],
  transactionDetailsRespones: null,
  banks: [],

  createTransaction: async (payload) => {
    try {
      set({ createLoading: true, fetchError: null });
      const response = await createInternalTransaction.execute(payload);
      set({ transaction: response }); // Lưu giao dịch mới vào 'transaction'
    } catch (error: any) {
      console.log("Lỗi khi tạo giao dịch: ", error);
      set({
        fetchError: error?.message || "Không thể tạo giao dịch.",
      });
      throw new Error("Không thể tạo giao dịch.");
    } finally {
      set({ createLoading: false });
    }
  },

  fetchBankAccountInfo: async () => {
    try {
      set({ fetchLoading: true, fetchError: null });
      const response = await getBankAccountInfo.execute();
      console.log(response);
      set({ bankAccountInfo: response }); // Cập nhật thông tin giao dịch
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin khách hàng: ", error);
      set({
        fetchError: error?.message || "Không thể lấy thông tin khách hàng.",
      });
      throw new Error("Không thể lấy thông tin khách hàng.");
    } finally {
      set({ fetchLoading: false });
    }
  },

  verifyOtp: async (payload) => {
    try {
      set({ verifyLoading: true, fetchError: null });
      await verifyOtp.execute(payload);
    } catch (error: any) {
      // console.log("Lỗi khi xác thực OTP: ", error);
      set({ fetchError: error.message });
      throw new Error("Lỗi khi xác thực OTP.");
    } finally {
      set({ verifyLoading: false });
    }
  },

  fetchTransaction: async (id) => {
    try {
      set({ fetchLoading: true, fetchError: null });
      const response = await getTransactionDetails.execute(id);
      set({ transactionDetailsRespones: response }); // Cập nhật thông tin giao dịch
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin giao dịch: ", error);
      set({
        fetchError: error?.message || "Không thể lấy thông tin giao dịch.",
      });
      throw new Error("Không thể lấy thông tin giao dịch.");
    } finally {
      set({ fetchLoading: false });
    }
  },

  fetchAllContact: async () => {
    try {
      set({ fetchLoading: true, fetchError: null });
      const response = await getAllContact();
      set({ contactList: response });
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin danh bạ: ", error);
      set({
        fetchError: error?.message || "Không thể lấy thông tin danh bạ",
      });
      if (error.response.data.code === 40002) {
        set({ fetchLoading: false });
        return;
      }
      throw new Error("Không thể lấy thông tin danh bạ.");
    } finally {
      set({ fetchLoading: false });
    }
  },

  fetchAllBank: async () => {
    try {
      set({ fetchLoading: true, fetchError: null });
      const response = await getAllBank();
      console.log("banks: ", response);
      set({ banks: response });
    } catch (error: any) {
      console.log("Lỗi khi lấy thông tin danh bạ: ", error.message);
      set({
        fetchError: error?.message || "Không thể lấy thông tin danh bạ",
      });
      throw new Error("Không thể lấy thông tin ngân hàng.");
    } finally {
      set({ fetchLoading: false });
    }
  },
}));

export default useTransactionStore;
