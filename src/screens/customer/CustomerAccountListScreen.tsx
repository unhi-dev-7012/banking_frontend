import React, { useState } from "react";
import { Button, Card, Typography, Row, Col, Space, message } from "antd";
import { ArrowRightCircle, Clock, Copy, Eye, EyeOff } from "lucide-react";
const { Text } = Typography;

interface ICustomerAccountListScreenProps {}

const CustomerAccountListScreen: React.FC<
  ICustomerAccountListScreenProps
> = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalance = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const handleCopyAccountNumber = () => {
    const accountNumber = "123456789";
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        message.success("Copy số tài khoản thành công");
      })
      .catch((error) => {
        console.log(error);
        message.error("Copy số tài khoản thất bại");
      });
  };

  return (
    <Card
      style={{
        margin: 30,
        width: 400,
        borderRadius: 16,
        border: "1px solid #d9d9d9",
      }}
    >
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Text style={{ fontSize: 12, color: "#595959" }}>Số tài khoản</Text>
        </Col>
        <Col span={24}>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#1677ff",
              }}
            >
              1234 5678
            </Text>
            <Space>
              <Copy
                style={{ fontSize: 8, color: "#bfbfbf", cursor: "pointer" }}
                onClick={handleCopyAccountNumber}
              />
            </Space>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Text style={{ fontSize: 12, color: "#595959" }}>
            Số dư tài khoản
          </Text>
        </Col>
        <Col span={24}>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#1677ff" }}
            >
              {isBalanceVisible ? "**********" : "100,000,000 VND"}{" "}
            </Text>
            {isBalanceVisible ? (
              <EyeOff
                style={{ fontSize: 8, color: "#bfbfbf", cursor: "pointer" }}
                onClick={toggleBalance}
              />
            ) : (
              <Eye
                style={{ color: "#bfbfbf", cursor: "pointer" }}
                onClick={toggleBalance}
              />
            )}
          </Space>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Col>
          <Button
            type="link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#1677ff",
            }}
          >
            <Clock size="small" />
            Lịch sử giao dịch
          </Button>
        </Col>
        <Col>
          <Button
            type="link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#1677ff",
            }}
          >
            <ArrowRightCircle size="small" />
            Chuyển tiền
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

CustomerAccountListScreen.displayName = "CustomerAccountListScreen";

export default CustomerAccountListScreen;
