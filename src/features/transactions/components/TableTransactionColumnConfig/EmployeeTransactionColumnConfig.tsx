import { ColumnsType } from "antd/es/table";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";

const { Text } = Typography;

export const EmployeeTransactionHistoryColumnConfig = (
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedTransaction: React.Dispatch<React.SetStateAction<any>>
): ColumnsType<any> => [
  {
    title: "Ngày giao dịch",
    dataIndex: "completedAt",
    key: "completedAt",
    render: (date: string) =>
      date ? new Date(date).toLocaleString() : "Unknown Date",
  },
  {
    title: "Người gửi",
    dataIndex: "remitter",
    key: "remitter",
    render: (remitter?: Record<string, any>) => (
      <div>
        <Text strong>{remitter?.name ?? "Unknown"}</Text> <br />
        <Text type="secondary">
          Số tài khoản: {remitter?.id ?? "Unknown"}
        </Text>{" "}
        <br />
        <Text type="secondary">{remitter?.bankName ?? "Unknown"}</Text>
      </div>
    ),
  },
  {
    title: "Người nhận",
    dataIndex: "beneficiary",
    key: "beneficiary",
    render: (beneficiary?: Record<string, any>) => (
      <div>
        <Text strong>{beneficiary?.name ?? "Unknown"}</Text> <br />
        <Text type="secondary">
          Số tài khoản: {beneficiary?.id ?? "Unknown"}
        </Text>{" "}
        <br />
        <Text type="secondary">{beneficiary?.bankName ?? "Unknown"}</Text>
      </div>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status?: string) => (
      <Tag color={status === "success" ? "green" : "orange"}>
        {status ?? "Unknown"}
      </Tag>
    ),
  },
  {
    title: "Loại giao dịch",
    dataIndex: "type",
    key: "type",
    render: (type?: string) => (
      <Tag color={type === "normal" ? "blue" : "purple"}>
        {type ?? "Unknown"}
      </Tag>
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
