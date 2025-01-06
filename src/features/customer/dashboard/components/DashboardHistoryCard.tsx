import { Button, Card, Flex, List, Tag, Typography } from "antd";
import { Transaction } from "../stores/dashboardStore";
import {
  ArrowDownToDot,
  ArrowUpFromDot,
  CheckCircle,
  CircleX,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@constants/path";

interface DataType {
  data: Transaction[] | undefined;
}

const DashboardHistoryCard: React.FC<DataType> = ({ data }) => {
  const navigate = useNavigate();

  const recentTransactions = data
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sắp xếp giảm dần theo thời gian
    .slice(0, 7); // Lấy 6 giao dịch đầu tiên

  const handleSeeMore = () => {
    navigate(ROUTES_PATH.CUSTOMER.HISTORY);
  };
  console.log("recent: ", recentTransactions);

  return (
    <Flex
      vertical
      style={{
        width: "32%",
        padding: "20px 20px 10px 20px",
        borderRadius: 16,
        border: "1px solid #d9d9d9",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "5px" }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Hoạt động gần đây
        </Typography.Title>
        <Button type="link" style={{ padding: 0 }} onClick={handleSeeMore}>
          {" "}
          Xem thêm
        </Button>
      </Flex>
      <List
        dataSource={recentTransactions}
        renderItem={(item) => {
          const formattedDate = new Date(item.date).toLocaleDateString(
            "vi-VN",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          );
          let categoryText = "";
          let categoryIcon = null;
          let categoryColor = "";
          let colorIcon = "";

          if (item.category === "outcoming") {
            categoryText = "Chi tiêu";
            categoryIcon = <ArrowUpFromDot color="red" />;
            categoryColor = "red";
            colorIcon = "error";
          } else if (item.category === "incoming") {
            categoryText = "Thu nhập";
            categoryIcon = <ArrowDownToDot color="blue" />;
            categoryColor = "blue";
            colorIcon = "processing";
          } else if (item.category === "debt") {
            categoryText =
              item.amount > 0 ? "Nợ được thanh toán" : "Thanh toán nợ";
            categoryIcon = <DollarSign color="gold" />;
            categoryColor = item.amount > 0 ? "blue" : "red";
            colorIcon = "gold";
          }

          // Dịch trạng thái
          let statusTag = null;
          if (item.status === "success") {
            statusTag = (
              <Tag
                icon={<CheckCircle size={10} />}
                bordered={false}
                color="success"
                style={{ marginLeft: 10 }}
              >
                {"  "}Thành công
              </Tag>
            );
          } else if (item.status === "failed") {
            statusTag = (
              <Tag
                icon={<CircleX size={10} />}
                bordered={false}
                color="error"
                style={{ marginLeft: 10 }}
              >
                {"  "}Thất bại
              </Tag>
            );
          }

          return (
            <List.Item key={item.date}>
              <Tag
                style={{
                  marginRight: 10,
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color={colorIcon}
                bordered={false}
              >
                {categoryIcon}
              </Tag>
              <List.Item.Meta
                title={
                  <>
                    {categoryText} {statusTag}
                  </>
                }
                description={formattedDate}
              />
              <div style={{ color: categoryColor }}>
                {item.amount > 0
                  ? `+ ${item.amount.toLocaleString("vi-VN")}`
                  : item.amount.toLocaleString("vi-VN")}
                đ
              </div>
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};

export default DashboardHistoryCard;
