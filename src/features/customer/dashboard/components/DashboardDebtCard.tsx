import { Card, Flex, Typography } from "antd";
import { ArrowUpNarrowWide } from "lucide-react";

interface IDashboardDebtCardProps {
  title: string;
}

const DashboardDebtCard: React.FC<IDashboardDebtCardProps> = ({ title }) => {
  return (
    <Card
      style={{
        width: "23%",
        borderRadius: 16,
        border: "1px solid #d9d9d9",
      }}
    >
      <Typography.Title level={4}>{title}</Typography.Title>

      <Typography.Text>Tháng 01 - 2025</Typography.Text>
      <Flex
        style={{ marginTop: "20px" }}
        align="center"
        justify="space-between"
      >
        <Typography.Text style={{ fontSize: "28px" }}>20.000đ</Typography.Text>
        <Flex gap={10} align="center">
          {<ArrowUpNarrowWide />}
          <Typography.Text style={{ fontSize: "16px", color: "blue" }}>
            20%
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default DashboardDebtCard;
