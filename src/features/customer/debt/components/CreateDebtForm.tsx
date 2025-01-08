import { Button, Flex, Form, Input, InputNumber, Spin } from "antd";
import React from "react";
import { useDebtStore } from "../stores/debtStore";
import { CreateDebtFormValue } from "../debtType";
import AccountInput from "@components/common/autocomplete/AccountInput";
import { useDebtorForm } from "../hooks/useDebtorForm";

const initialValues: CreateDebtFormValue = {
  debtorId: "",
  fullname: "",
  amount: 0,
  message: "",
};

export const messages = {
  notifications: {
    success: "Nợ đã được tạo thành công",
  },
  validations: {
    emptyField: "Trường này không được để trống!",
    positiveAmount: "Số tiền phải lớn hơn 0",
  },
  form: {
    debtorAccountId: "Số tài khoản người nhận nợ",
    debtorAccountName: "Tên tài khoản người nhận nợ",
    amount: "Số tiền",
    message: "Lời nhắn (tùy chọn)",
    action: "Tạo nợ",
  },
};

interface DebtFormProps {
  closeModal: () => void;
}

const CreateDebtForm: React.FC<DebtFormProps> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const { createDebt, loading, setLoading } = useDebtStore();

  const {
    debtorName,
    debtorId,
    isDebtorNameVisible,
    handleDebtorChange,
    debtorLoading,
    accountError,
    setAccountError,
  } = useDebtorForm();

  const handleSuggestedAmount = (amount: number) => {
    form.setFieldsValue({ amount }); // Update the form field
  };

  const onFinish = async (values: CreateDebtFormValue) => {
    if (debtorId) values.debtorId = debtorId;
    if (accountError) {
      return; // Prevent form submission
    }
    try {
      setLoading(true);
      await createDebt(values);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="create_debt_form"
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      {/* Debtor Account (Dropdown / Input) */}
      <Form.Item label="Số tài khoản người nhận nợ" name="debtorAccountId">
        <AccountInput
          setError={setAccountError}
          setBankAccountId={handleDebtorChange}
          error={accountError}
        />
      </Form.Item>

      {/* Debtor Name (conditionally visible) */}
      {isDebtorNameVisible && (
        <Form.Item label="Tên người nhận nợ">
          <Input value={debtorName || ""} disabled />
          {debtorLoading && (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}{" "}
          {/* Loading spinner */}
        </Form.Item>
      )}

      {/* Amount */}
      <Form.Item
        label={messages.form.amount}
        name="amount"
        rules={[
          { required: true, message: messages.validations.emptyField },
          {
            type: "number",
            min: 1,
            message: messages.validations.positiveAmount,
          },
        ]}
      >
        <InputNumber<number>
          style={{ width: "100%" }}
          min={1}
          placeholder="Nhập số tiền"
          formatter={(value) =>
            ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          suffix="VND"
          onChange={(value) => form.setFieldsValue({ amount: value ?? 0 })}
        />
      </Form.Item>

      {/* Suggested amounts */}
      <div style={{ marginBottom: 16 }}>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => handleSuggestedAmount(10000)}
        >
          10,000
        </Button>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => handleSuggestedAmount(50000)}
        >
          50,000
        </Button>
        <Button onClick={() => handleSuggestedAmount(100000)}>100,000</Button>
      </div>

      {/* Message */}
      <Form.Item label={messages.form.message} name="message">
        <Input.TextArea placeholder="Nhập lời nhắn (tùy chọn)" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Flex justify="flex-end" gap="middle">
          <Button type="text" onClick={closeModal}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading} // Show loading spinner when creating debt
          >
            {loading ? "Đang tạo..." : messages.form.action}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default CreateDebtForm;
