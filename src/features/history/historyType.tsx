// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";

const { Text } = Typography;

export const CustomerTransactionHistoryColumnConfig = (
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedTransaction: React.Dispatch<React.SetStateAction<any>>
): ColumnsType<any> => [
  {
    title: "Ngày giao dịch",
    dataIndex: "date",
    key: "date",
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "success" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "Phân loại",
    dataIndex: "category",
    key: "category",
    render: (category: string) => {
      let icon = null;
      let color = "purple";
      let text = undefined;
      if (category === "incoming") {
        icon = <ArrowDownOutlined />;
        color = "blue";
        text = "Tiền vào";
      } else if (category === "outcoming") {
        icon = <ArrowUpOutlined />;
        color = "red";
        text = "Tiền ra";
      } else if (category === "debt") {
        icon = <DollarOutlined />;
        color = "gold";
        text = "Thanh toán nợ";
      }
      return (
        <Tag color={color}>
          {icon} {text}
        </Tag>
      );
    },
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => (
      <span style={{ color: amount < 0 ? "red" : "green" }}>
        {amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </span>
    ),
  },
  {
    key: "actions",
    render: (_: any, record: any) => (
      <Tooltip title="Xem chi tiết">
        <InfoCircleOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "gray" }}
          onClick={() => {
            setSelectedTransaction(record);
            setIsModalVisible(true);
          }}
        />
      </Tooltip>
    ),
  },
];

export const EmployeeTransactionHistoryColumnConfig = (
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedTransaction: React.Dispatch<React.SetStateAction<any>>
): ColumnsType<any> => [
  {
    title: "Ngày giao dịch",
    dataIndex: "completedAt",
    key: "completedAt",
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: "Người gửi",
    dataIndex: "remitter",
    key: "remitter",
    render: (remitter: Record<string, any>) => (
      <div>
        <Text strong>{remitter.name}</Text> <br />
        <Text type="secondary">Số tài khoản: {remitter.id}</Text> <br />
        <Text type="secondary">{remitter.bankName}</Text>
      </div>
    ),
  },
  {
    title: "Người nhận",
    dataIndex: "receiver",
    key: "receiver",
    render: (receiver: Record<string, any>) => (
      <div>
        <Text strong>{receiver.name}</Text> <br />
        <Text type="secondary">Số tài khoản: {receiver.id}</Text> <br />
        <Text type="secondary">{receiver.bankName}</Text>
      </div>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "success" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "Loại giao dịch",
    dataIndex: "type",
    key: "type",
    render: (type: string) => (
      <Tag color={type === "normal" ? "blue" : "purple"}>{type}</Tag>
    ),
  },
  {
    key: "actions",
    render: (_: any, record: any) => (
      <Tooltip title="Xem chi tiết">
        <InfoCircleOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "gray" }}
          onClick={() => {
            setSelectedTransaction(record);
            setIsModalVisible(true);
          }}
        />
      </Tooltip>
    ),
  },
];
export const TransactionHistoryTabs = [
  { label: "Tất cả", key: "all" },
  { label: "Tiền ra", key: "outcoming" },
  { label: "Tiền vào", key: "incoming" },
  { label: "Thanh toán nợ", key: "debt" },
];
