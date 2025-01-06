import { Flex, Tag, Typography } from "antd";
import {
  ChevronsDown,
  ChevronsUp,
  CircleArrowOutDownLeft,
  CircleArrowOutUpRight,
} from "lucide-react";

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
  const formattedValue =
    title === "Tổng nợ đã tạo"
      ? value
      : (value as number).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });

  return (
    <Flex
      vertical
      style={{
        padding: "20px",
        width: "23%",
        borderRadius: 16,
        border: "1px solid #d9d9d9",
      }}
    >
      <Flex justify="space-between" style={{ height: "25%" }}>
        <Flex vertical>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text>{month}</Typography.Text>
        </Flex>

        {isPositive ? (
          <CircleArrowOutUpRight color="blue" />
        ) : (
          <CircleArrowOutDownLeft color="red" />
        )}
      </Flex>

      <Flex align="center" style={{ height: "50%" }}>
        <Typography.Text style={{ fontSize: "28px" }}>
          {formattedValue}
        </Typography.Text>
      </Flex>

      <Flex
        gap={10}
        align="center"
        justify="space-between"
        style={{ height: "20%" }}
      >
        <Typography.Text
          style={{
            fontSize: "16px",
            color: "#979993",
          }}
        >
          So với tháng trước
        </Typography.Text>
        <Tag
          style={{
            padding: "5px 10px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          color={isPositive ? "processing" : "error"}
          bordered={false}
        >
          {isPositive ? (
            <ChevronsUp color="blue" />
          ) : (
            <ChevronsDown color="red" />
          )}
          <Typography.Text
            style={{
              fontSize: "16px",
              color: isPositive ? "blue" : "red",
            }}
          >
            {Math.abs(percentage).toFixed(2)}%
          </Typography.Text>
        </Tag>
      </Flex>
    </Flex>
  );
};

export default DashboardDebtCard;
