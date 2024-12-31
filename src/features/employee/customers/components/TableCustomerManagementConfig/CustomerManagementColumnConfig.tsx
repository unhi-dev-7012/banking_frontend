import { Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const CustomerManagementColumnConfig = (
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSelectedCustomer: React.Dispatch<React.SetStateAction<any>>
): ColumnsType<any> => [
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "date",
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => (
      <Tooltip title={email}>
        <Text ellipsis style={{ maxWidth: 150 }}>
          {email}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    render: (fullName: string) => (
      <Text strong style={{ color: "#1890ff" }}>
        {fullName}
      </Text>
    ),
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (username: string) => (
      <Text italic style={{ color: "#555" }}>
        {username}
      </Text>
    ),
  },
  {
    title: "Số tài khoản",
    dataIndex: "bankAccount",
    key: "bankAccount",
    render: (bankAccount: Record<string, any>) => <Text>{bankAccount.id}</Text>,
  },
  {
    key: "actions",
    render: (_: any, record: any) => (
      <Tooltip title="Xem chi tiết">
        <InfoCircleOutlined
          style={{
            fontSize: 18,
            cursor: "pointer",
            color: "#1890ff",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "#40a9ff";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = "#1890ff";
          }}
          onClick={() => {
            setIsSelectedCustomer(record);
            setIsModalVisible(true);
          }}
        />
      </Tooltip>
    ),
  },
];
