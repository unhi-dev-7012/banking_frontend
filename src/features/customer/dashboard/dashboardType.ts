export interface Transaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  remitterId: string;
  type: string;
  transactionFee: number;
  beneficiaryId: string;
  beneficiaryBankId: string;
  remitterPaidFee: true;
  message: string;
  beneficiaryName: string;
  remitterBankId: string;
  remitterName: string;
  status: TransactionStatus;
}

export interface Bank {
  id: string;
  code: string;
  name: string;
  shortName: string;
}

export enum TransactionType {
  DEBT = "debt",
  NORMAL = "normal",
}

export enum TransactionStatus {
  CREATED = "created",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface VerifyOtpPayload {
  id: string;
  otp: string;
}

export interface VerifyOtpResponse {
  data: boolean;
}

export interface CreateTransactionPayload {
  remitterId: string;
  beneficiaryId: string;
  beneficiaryBankId: string;
  amount: number;
  message: string;
  remitterPaidFee: boolean;
}

export interface ContactUserInfo {
  beneficiaryId: string;
  beneficiaryName: string;
  nickname: string;
  bankCode: string;
  bankName: string;
  bankShortName: string;
  bankId: string;
}
