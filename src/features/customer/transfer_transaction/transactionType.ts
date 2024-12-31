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

  //==== example
  // id: "670396cf-0eae-46a9-878e-2385a8748c3f";
  // createdAt: "2024-12-30T08:20:14.857Z";
  // updatedAt: "2024-12-30T08:20:14.857Z";
  // amount: 91535;
  // remitterId: "21120001";
  // type: "normal";
  // transactionFee: 1100;
  // beneficiaryId: "21120002";
  // beneficiaryBankId: "562cf1cd-7d25-4ba3-8c13-f5d86fa4273d";
  // remitterPaidFee: true;
  // message: "Chuyen tien";
  // beneficiaryName: "Uyển Nhi Hehe";
  // remitterBankId: "562cf1cd-7d25-4ba3-8c13-f5d86fa4273d";
  // remitterName: "Uyển Nhi";
  // status: "created";
}

export interface Bank {
  code: string;
  name: string;
  shortName: string;

  //=== example
  // code: "NHB";
  // name: "National Heritage Bank";
  // shortName: "NH Bank";
  // logoUrl: "https://example.com/logo.png";
  // algorithm: "RS256";
}

export enum TransactionStatus {
  CREATED = "created",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface GetTransactionResponse {
  id: string;
  date: string;
  status: string;
  category: string;
  amount: number;
  message: string;
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

  // remitterId: "21120001";
  // beneficiaryId: "21120002";
  // beneficiaryBankId: "562cf1cd-7d25-4ba3-8c13-f5d86fa4273d";
  // amount: 91535;
  // message: "Chuyen tien";
  // remitterPaidFee: false;
}

export interface ContactUserInfo {
  // beneficiaryId: "21120002";
  // beneficiaryName: "Uyển Nhi Hehe";
  // nickname: "Tui la uyen nhi ne";
  // bankCode: "NHB";
  // bankName: "National Heritage Bank";
  // bankShortName: "NH Bank";

  beneficiaryId: string;
  beneficiaryName: string;
  nickname: string;
  bankCode: string;
  bankName: string;
  bankShortName: string;
}
