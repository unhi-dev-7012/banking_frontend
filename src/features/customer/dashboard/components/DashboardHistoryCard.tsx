import { Button, Card, Flex, List, Typography } from "antd";

interface DataType {
  transactionType: string;
  createdAt: string;
  amount: number;
}

const data: DataType[] = [
  {
    transactionType: "Chuyển tiền",
    createdAt: "2025-01-02 14:00",
    amount: 500,
  },
  {
    transactionType: "Nhận tiền",
    createdAt: "2025-01-02 13:30",
    amount: 200,
  },
  {
    transactionType: "Chuyển tiền",
    createdAt: "2025-01-01 09:45",
    amount: 1000,
  },
  {
    transactionType: "Nhận tiền",
    createdAt: "2025-01-01 08:00",
    amount: 750,
  },
];

const DashboardHistoryCard: React.FC = () => (
  <Card
    style={{
      width: "32%",
      borderRadius: 16,
      border: "1px solid #d9d9d9",
    }}
  >
    <Flex justify="space-between" align="center">
      <Typography.Title level={4} style={{ margin: 0 }}>
        Hoạt động gần đây
      </Typography.Title>
      <Button type="link"> Xem thêm</Button>
    </Flex>
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.createdAt}>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.transactionType}</a>}
            description={item.createdAt}
          />
          <div>{item.amount}</div>
        </List.Item>
      )}
    />
  </Card>
);

export default DashboardHistoryCard;
