import React, { useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  theme,
  Typography,
} from "antd";
import { useInternalTransactionForm } from "../hooks/useInternalTransactionForm";
import BeneficiaryInput from "./BeneficiaryInput";
import useTransactionStore from "../stores/transactionStore";
import { CreateTransactionPayload } from "../transactionType";

interface CreateInternalTransactionFormProps {
  onSubmitSuccess: () => void; // Function to trigger step change
}

const CreateInternalTransactionForm: React.FC<
  CreateInternalTransactionFormProps
> = ({ onSubmitSuccess }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const {
    beneficiaryName,
    beneficiaryId,
    isBeneficiaryNameVisible,
    handleBeneficiaryChange,
    accountError,
    setAccountError,
  } = useInternalTransactionForm();

  const {
    createLoading,
    createTransaction,
    bankAccountInfo,
    fetchBankAccountInfo,
    fetchAllBank,
  } = useTransactionStore();

  const handleSuggestedAmount = (amount: number) => {
    form.setFieldsValue({ amount });
  };

  useEffect(() => {
    fetchBankAccountInfo();
    fetchAllBank();
  }, []);

  useEffect(() => {
    if (bankAccountInfo) {
      form.setFieldsValue({
        message: `${bankAccountInfo.fullName} chuyển tiền`, // Set message when data is fetched
      });
    }
  }, [bankAccountInfo]); // Dependency on bankAccountInfo

  const onFinish = async (values: CreateTransactionPayload) => {
    if (accountError) {
      return; // Prevent form submission
    }
    try {
      if (beneficiaryId) values.beneficiaryId = beneficiaryId;
      if (bankAccountInfo) {
        values.remitterId = bankAccountInfo?.id;
        values.beneficiaryBankId = bankAccountInfo?.bankId;
      }
      await createTransaction(values);
      onSubmitSuccess();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    width: "55%",
    padding: "20px",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelFontSize: 16,
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
                {bankAccountInfo?.id}
              </Typography.Text>
              <Typography.Text style={{ fontSize: 16 }}>-</Typography.Text>
              <Typography.Text style={{ fontSize: 16 }}>
                {bankAccountInfo?.fullName}
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
                {bankAccountInfo?.balance.toLocaleString("vi-VN", {
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
          initialValues={{
            message: bankAccountInfo?.fullName
              ? `${bankAccountInfo.fullName} chuyển tiền`
              : "",
          }}
          layout="horizontal"
          form={form}
          onFinish={onFinish}
          labelCol={{ flex: "350px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          style={{ marginTop: 10 }}
          requiredMark={false}
          clearOnDestroy
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
                readOnly={true}
                value={beneficiaryName || ""}
                style={{
                  width: "100%",
                  height: "42px",
                  alignContent: "center",
                }}
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
            <InputNumber<number>
              style={{ width: "100%", height: "42px", alignContent: "center" }}
              min={1}
              placeholder="Nhập số tiền"
              formatter={(value) =>
                ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
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
            rules={[
              {
                required: true,
                message: "Nội dung chuyển khoản không được để trống",
              },
            ]}
          >
            <Input.TextArea placeholder="Nhập nội dung giao dịch (tùy chọn)" />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end" gap="middle">
              {/* <Button
                type="text"
                onClick={() => {
                  form.resetFields();
                }}
              >
                Làm lại
              </Button> */}
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

export default CreateInternalTransactionForm;
