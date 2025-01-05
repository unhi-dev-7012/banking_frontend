import { Card, Flex, Typography } from "antd";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

interface IDashboardDebtCardProps {
  title: string;
  value: number | string;
  percentage: number;
  month: string;
}

const DashboardDebtCard: React.FC<IDashboardDebtCardProps> = ({
  title,
  value,
  percentage,
  month,
}) => {
  const isPositive = percentage >= 0;

  return (
    <Card
      style={{
        width: "23%",
        borderRadius: 16,
        border: "1px solid #d9d9d9",
      }}
    >
      <Typography.Title level={4}>{title}</Typography.Title>

      <Typography.Text>{month}</Typography.Text>
      <Flex
        style={{ marginTop: "20px" }}
        align="center"
        justify="space-between"
      >
        <Typography.Text style={{ fontSize: "28px" }}>
          {value.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Typography.Text>
        <Flex gap={10} align="center">
          {isPositive ? <ArrowUpNarrowWide /> : <ArrowDownNarrowWide />}
          <Typography.Text
            style={{
              fontSize: "16px",
              color: isPositive ? "blue" : "red",
            }}
          >
            {Math.abs(percentage).toFixed(2)}%
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default DashboardDebtCard;
