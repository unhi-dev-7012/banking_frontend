import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
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

  return (
    <Card>
      <Typography.Title level={4}>Từ tài khoản</Typography.Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Text>
          {userInfo?.id} - {userInfo?.fullName}
        </Typography.Text>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #f0f0f0",
            margin: "8px 0",
          }}
        />
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Typography.Text>Số dư khả dụng</Typography.Text>
          <Typography.Text>{userInfo?.balance}</Typography.Text>
        </Space>
      </Space>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ marginTop: 20 }}
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
            <Input value={beneficiaryName || ""} disabled />
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
            style={{ width: "100%" }}
            placeholder="Nhập số tiền"
            min={1}
          />
        </Form.Item>

        <Space>
          <Button onClick={() => handleSuggestedAmount(100000)}>100,000</Button>
          <Button onClick={() => handleSuggestedAmount(500000)}>500,000</Button>
          <Button onClick={() => handleSuggestedAmount(1000000)}>
            1,000,000
          </Button>
        </Space>

        <Form.Item
          label="Chọn hình thức tính phí"
          name="remitterPaidFee"
          rules={[
            { required: true, message: "Vui lòng chọn hình thức tính phí!" },
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
                form.resetFields;
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
    </Card>
  );
};

export default CreateTransactionForm;
