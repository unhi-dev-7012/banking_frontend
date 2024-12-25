import React, { useState } from "react";
import {
  Table,
  Tabs,
  Typography,
  Tag,
  Modal,
  Button,
  Descriptions,
  Tooltip,
} from "antd";
import {
  InfoCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Dữ liệu dump
const transactionData = {
  data: [
    {
      id: "6b56cbbf-1dfd-4569-98f9-e2b587a8da8a",
      date: "2024-12-24T10:15:21.120Z",
      status: "success",
      category: "incoming",
      amount: 500000,
      message:
        "Account 21120002 +500000 at Mon Dec 24 2024 17:15:21 GMT+0700 (Indochina Time). Balance: 158084400. Transaction: 6B56CBBF-1DFD-4569-98F9-E2B587A8DA8A - Nap tien",
    },
    {
      id: "f6a9b8c5-c421-4fd3-91f5-bdebe66a7f1f",
      date: "2024-12-24T12:05:56.344Z",
      status: "pending",
      category: "outcoming",
      amount: -200000,
      message:
        "Account 21120001 -200000 at Mon Dec 24 2024 19:05:56 GMT+0700 (Indochina Time). Balance: 157884400. Transaction: F6A9B8C5-C421-4FD3-91F5-BDEBE66A7F1F - Chuyen tien",
    },
    {
      id: "b18f6e5c-9c52-4d33-9f33-b47437ec7a9d",
      date: "2024-12-24T14:12:05.214Z",
      status: "success",
      category: "debt",
      amount: -300000,
      message: "Thanh toan no cho ng khac",
    },
    {
      id: "7c5e8cb9-3fdf-47d7-96c4-97f7ccf249bc",
      date: "2024-12-24T15:30:47.100Z",
      status: "success",
      category: "incoming",
      amount: 1000000,
      message:
        "Account 21120002 +1000000 at Mon Dec 24 2024 22:30:47 GMT+0700 (Indochina Time). Balance: 158384400. Transaction: 7C5E8CB9-3FDF-47D7-96C4-97F7CCF249BC - Nap tien",
    },
    {
      id: "d7f8c6ed-8a38-4eaf-b0e3-f4b3e3a73d12",
      date: "2024-12-24T16:45:35.001Z",
      status: "failed",
      category: "outcoming",
      amount: -500000,
      message:
        "Account 21120001 -500000 at Mon Dec 24 2024 23:45:35 GMT+0700 (Indochina Time). Balance: 157884400. Transaction: D7F8C6ED-8A38-4EAF-B0E3-F4B3E3A73D12 - Chuyen tien",
    },
    {
      id: "3c2c8ea4-f4e2-4b4d-b459-8643fcb6815b",
      date: "2024-12-24T18:00:10.235Z",
      status: "created",
      category: "debt",
      amount: -150000,
      message: "Thanh toan no cho ng khac",
    },
  ],
  metadata: {
    page: 2,
    totalCount: 6,
  },
};

const CustomerHistoryScreen: React.FC = () => {
  const [filteredData, setFilteredData] = useState(transactionData.data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => `#${id.slice(0, 8).toLocaleUpperCase()}`, // Chỉ lấy 8 ký tự đầu
    },
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
          text = "Trả nợ";
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
      // title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Tooltip title="View details">
          <InfoCircleOutlined
            style={{ fontSize: 18, cursor: "pointer", color: "gray" }} // Màu xám
            onClick={() => {
              setSelectedTransaction(record);
              setIsModalVisible(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    if (key === "all") {
      // Khi chọn tab "All", không lọc dữ liệu
      setFilteredData(transactionData.data);
    } else {
      // Khi chọn các tab khác, chỉ lọc theo category
      setFilteredData(
        transactionData.data.filter((item) => item.category === key)
      );
    }
  };

  const tabItems = [
    { label: "Tất cả", key: "all" },
    { label: "Tiền ra", key: "outcoming" },
    { label: "Tiền vào", key: "incoming" },
    { label: "Trả nợ", key: "debt" },
  ];

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Lịch sử giao dịch</Title>
      <Tabs
        defaultActiveKey="all"
        onChange={handleTabChange}
        items={tabItems.map((tab) => ({ key: tab.key, label: tab.label }))}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          current: transactionData.metadata.page,
          total: transactionData.metadata.totalCount,
          pageSize: 5,
        }}
        scroll={{ x: 800 }}
      />

      {/* Modal Hiển Thị Chi Tiết */}
      <Modal
        title="Transaction Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        centered
        width={600}
      >
        {selectedTransaction && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">
              #{selectedTransaction.id.slice(0, 8)}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(selectedTransaction.date).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  selectedTransaction.status === "success" ? "green" : "orange"
                }
              >
                {selectedTransaction.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              <Tag
                color={
                  selectedTransaction.category === "incoming"
                    ? "blue"
                    : selectedTransaction.category === "outcoming"
                    ? "red"
                    : "gold"
                }
              >
                {selectedTransaction.category === "incoming" && (
                  <ArrowDownOutlined />
                )}
                {selectedTransaction.category === "outcoming" && (
                  <ArrowUpOutlined />
                )}
                {selectedTransaction.category === "debt" && <DollarOutlined />}
                {selectedTransaction.category}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {selectedTransaction.amount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {selectedTransaction.message || "No message available"}
              </span>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default CustomerHistoryScreen;
