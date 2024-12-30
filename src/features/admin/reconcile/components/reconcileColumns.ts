import { ColumnsType } from "antd/es/table";

export const reconcileColumns: ColumnsType<any> = [
  {
    title: "STK gửi",
    key: "remitterId",
    dataIndex: "remitterId",
  },
  {
    title: "Tên người gửi",
    key: "remitterName",
    dataIndex: "remitterName",
  },
  {
    title: "Ngân hàng gửi",
    key: "remitterBankName",
    dataIndex: "remitterBankName",
  },
  {
    title: "STK nhận",
    key: "beneficiaryId",
    dataIndex: "beneficiaryId",
  },
  {
    title: "Tên người nhậnnhận",
    key: "beneficiaryName",
    dataIndex: "beneficiaryName",
  },
  {
    title: "Ngân hàng nhận",
    key: "beneficiaryBankName",
    dataIndex: "beneficiaryBankName",
  },
  {
    title: "Số tiền",
    key: "amount",
    dataIndex: "amount",
  },
  {
    title: "Phí giao dịch",
    key: "transactionFee",
    dataIndex: "transactionFee",
  },
];
