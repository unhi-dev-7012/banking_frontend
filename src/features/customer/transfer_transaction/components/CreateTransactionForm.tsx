import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  theme,
  Typography,
} from "antd";
import { useTransactionForm } from "../hooks/useTransactionForm";
import getBankAccountInfo, {
  BankAccountInfo,
} from "../services/getBankAccountInfo";
import BeneficiaryInput from "./BeneficiaryInput";
import useTransactionStore from "../stores/transactionStore";
import { CreateTransactionPayload } from "../transactionType";

interface CreateTransactionFormProps {
  onSubmitSuccess: () => void; // Function to trigger step change
}

const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({
  onSubmitSuccess,
}) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const {
    beneficiaryName,
    beneficiaryId,
    isBeneficiaryNameVisible,
    handleBeneficiaryChange,
    accountError,
    setAccountError,
  } = useTransactionForm();

  const { createLoading, createTransaction } = useTransactionStore();

  const [userInfo, setUserInfo] = useState<BankAccountInfo | null>(null);

  const handleSuggestedAmount = (amount: number) => {
    form.setFieldsValue({ amount });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getBankAccountInfo.execute();
        setUserInfo(data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin tài khoản:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const onFinish = async (values: CreateTransactionPayload) => {
    if (accountError) {
      return; // Prevent form submission
    }
    try {
      if (beneficiaryId) values.beneficiaryId = beneficiaryId;
      if (userInfo) {
        values.remitterId = userInfo?.id;
        values.beneficiaryBankId = userInfo?.bankId;
      }
      await createTransaction(values);
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const contentStyle: React.CSSProperties = {
    // lineHeight: "260px",
    color: token.colorTextTertiary,
    width: "55%",
    padding: "20px",
    // backgroundColor: token.colorFillAlter,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    // marginTop: 10,
  };

  const formatter = (value: string) => {
    if (!value) return "";
    // Thêm dấu phân cách cho nghìn và đơn vị "VND"
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            fontSize: 16,
          },
        },
      }}
    >
      <Flex vertical gap={10} style={contentStyle}>
        <Typography.Title
          level={4}
          style={{ margin: "5px 0 5px 0px", textAlign: "left" }}
        >
          Từ tài khoản
        </Typography.Title>
        <Flex justify="space-between">
          <Typography.Text style={{ fontSize: 16 }}>
            Số tài khoản tài khoản
          </Typography.Text>
          <Flex
            vertical
            style={{
              width: "453px",
              border: "1px solid #cddcec",
              borderRadius: "4px",
              padding: "5px 20px",
            }}
          >
            <Flex justify="space-between">
              <Typography.Text style={{ fontSize: 16 }}>
                {userInfo?.id}
              </Typography.Text>
              <Typography.Text style={{ fontSize: 16 }}>-</Typography.Text>
              <Typography.Text style={{ fontSize: 16 }}>
                {userInfo?.fullName}
              </Typography.Text>
            </Flex>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #f0f0f0",
                margin: "8px 0",
              }}
            />
            <Flex justify="space-between">
              <Typography.Text>Số dư khả dụng</Typography.Text>
              <Typography.Text style={{ color: "#1677ff" }}>
                {userInfo?.balance.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
        <Typography.Title
          level={4}
          style={{ margin: "5px 0 5px 0px", textAlign: "left" }}
        >
          Đến tài khoản
        </Typography.Title>
        <Form
          layout="horizontal"
          form={form}
          onFinish={onFinish}
          labelCol={{ flex: "350px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          style={{ marginTop: 20 }}
          requiredMark={false}
        >
          <Form.Item label="Số tài khoản người nhận">
            <BeneficiaryInput
              setBankAccountId={handleBeneficiaryChange}
              setError={setAccountError}
              error={accountError}
            />
          </Form.Item>

          {isBeneficiaryNameVisible && (
            <Form.Item label="Tên người nhận">
              <Input
                value={beneficiaryName || ""}
                style={{
                  width: "100%",
                  height: "42px",
                  alignContent: "center",
                }}
                disabled
              />
            </Form.Item>
          )}

          <Form.Item
            label="Số tiền giao dịch"
            name="amount"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền!" },
              { type: "number", min: 1, message: "Số tiền phải lớn hơn 0" },
            ]}
          >
            <InputNumber
              style={{ width: "100%", height: "42px", alignContent: "center" }}
              placeholder="Nhập số tiền"
              min={1}
              suffix="VND"
            />
          </Form.Item>

          <Flex
            justify="flex-end"
            gap={12}
            style={{ marginBottom: 15 }}
            align="center"
          >
            <Typography.Text style={{ color: "#bfc9d6" }}>
              Gợi ý
            </Typography.Text>
            <Button onClick={() => handleSuggestedAmount(100000)}>
              100,000 VND
            </Button>
            <Button onClick={() => handleSuggestedAmount(500000)}>
              500,000 VND
            </Button>
            <Button onClick={() => handleSuggestedAmount(1000000)}>
              1,000,000 VND
            </Button>
          </Flex>

          <Form.Item
            label="Chọn hình thức tính phí"
            name="remitterPaidFee"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình thức tính phí!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={false}> Người nhận trả phí</Radio>
              <Radio value={true}> Người gửi trả phí </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Nội dung giao dịch"
            name="message"
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Nhập nội dung giao dịch (tùy chọn)" />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end" gap="middle">
              <Button
                type="text"
                onClick={() => {
                  form.resetFields();
                }}
              >
                Làm lại
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={createLoading} // Show loading spinner when creating debt
              >
                {createLoading ? "Đang thực hiện..." : "Tiếp tục"}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </ConfigProvider>
  );
};

export default CreateTransactionForm;
