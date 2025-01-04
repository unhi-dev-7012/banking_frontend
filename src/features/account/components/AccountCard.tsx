import { Button, Card, Col, message, Row, Space, Typography } from "antd";
import { ArrowRightCircle, Clock, Copy, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserData, UserData } from "../../auth/services/getUserData";

const { Text } = Typography;

const AccountCard: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    balance: 0,
    bankAccount: "",
  });
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalance = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const handleCopyAccountNumber = () => {
    const accountNumber = userData.bankAccount;
    navigator.clipboard
      .writeText(accountNumber ?? "")
      .then(() => {
        message.success("Sao chép số tài khoản thành công");
      })
      .catch((error) => {
        console.log(error);
        message.error("Sao chép số tài khoản thất bại");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <Card
      style={{
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
              {userData.bankAccount}
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
              {isBalanceVisible
                ? "**********"
                : (userData.balance ?? 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
            </Text>
            {true ? (
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

export default AccountCard;
