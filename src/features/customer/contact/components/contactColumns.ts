import { ColumnsType } from "antd/es/table";

export const contactColumns: ColumnsType<any> = [
  {
    title: "Số tài khoản người nhậnnhận",
    dataIndex: "beneficiaryId",
    key: "beneficiaryId",
  },
  {
    title: "Ngân hàng",
    dataIndex: "bankName",
    key: "bankName",
  },
  {
    title: "Tên người nhận",
    dataIndex: "beneficiaryName",
    key: "beneficiaryName",
  },
  {
    title: "Tên dễ nhớ",
    dataIndex: "nickname",
    key: "nickname",
  },
];
