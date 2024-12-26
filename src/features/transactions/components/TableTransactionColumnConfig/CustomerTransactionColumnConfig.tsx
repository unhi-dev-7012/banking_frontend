import { ColumnsType } from "antd/es/table";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip } from "antd";

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
