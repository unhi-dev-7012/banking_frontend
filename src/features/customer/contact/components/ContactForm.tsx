import { Button, Form, Input, message, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "./ContactContext";
import api from "@utils/api";
import { createContact } from "../services/createContact";
import { updateContact } from "../services/updateContact";

interface ContactFormValue {
  id: string;
  bankId: string;
  beneficiaryId: string;
  beneficiaryName: string;
  nickname: string;
}

const messages = {
  notifications: {
    success: {
      add: "Thêm người nhận thành công",
      edit: "Cập nhật người nhận thành công",
    },
    fail: {
      add: "Thêm người nhận thất bại",
      edit: "Cập nhật người nhận thất bại",
    },
  },
  form: {
    bank: {
      name: "bankId",
      label: "Ngân hàng",
      placeholder: "Chọn ngân hàng",
    },
    beneficiaryId: {
      name: "beneficiaryId",
      label: "Số tài khoản",
      placeholder: "Nhập số tài khoản",
      error: "Không tìm thấy tài khoản! Hãy kiểm tra lại!",
    },
    beneficiaryName: {
      name: "beneficiaryName",
      label: "Tên tài khoản",
      placeholder: "Nhập tên tài khoản",
    },
    nickname: {
      name: "nickname",
      label: "Tên gợi nhớ",
      placeholder: "Nhập tên gọn",
    },
    submit: "Thêm mới",
  },
};

interface ContactFormProps {
  closeModal: () => void;
  mode: string;
  initialValues?: Partial<ContactFormValue>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  closeModal,
  mode,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { state, fetchContact } = useContext(ContactContext);
  const { banks, loading, pagination } = state;
  const [beneficiaryName, setBeneficiaryName] = useState(
    initialValues?.beneficiaryName || ""
  );

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [initialValues, mode]);

  const handleSubmit = async (values: ContactFormValue) => {
    try {
      if (mode === "add") {
        await createContact(
          values.bankId,
          values.beneficiaryId,
          values.nickname
        );
      } else {
        await updateContact(
          initialValues?.id as string,
          values.nickname,
          values.beneficiaryId
        );
      }
      await fetchContact(banks, pagination);
      closeModal();
      form.resetFields();
      message.success(
        messages.notifications.success[mode === "add" ? "add" : "edit"]
      );
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response;

        switch (status) {
          case 404:
            message.error("Không tìm thấy tài nguyên yêu cầu.");
            break;
          case 400:
            message.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            message.error(
              "Tài khoản này trùng với tài khoản của bạn hoặc đã được thêm."
            );
            break;
          default:
            message.error(
              messages.notifications.fail[mode === "add" ? "add" : "edit"]
            );
            break;
        }
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  const fetchBeneficiaryName = async (
    bankId: string,
    beneficiaryId: string
  ) => {
    const bankCode = banks.find((bank) => bank.id === bankId)?.code;
    if (!bankCode) return;

    try {
      const response = await api.post("api/customer/v1/bank-accounts/get-one", {
        id: beneficiaryId,
        code: bankCode,
      });

      setBeneficiaryName(response.data.fullName);
      form.setFieldValue(
        messages.form.beneficiaryName.name,
        response.data.fullName
      );
      form.setFields([
        {
          name: messages.form.beneficiaryId.name,
          errors: [], // Reset errors
        },
      ]);
    } catch (error) {
      setBeneficiaryName("");
      form.setFieldValue(messages.form.beneficiaryName.name, "");
      form.setFields([
        {
          name: messages.form.beneficiaryId.name,
          errors: [messages.form.beneficiaryId.error],
        },
      ]);
    }
  };

  useEffect(() => {
    const formValues = form.getFieldsValue();
    console.log("Form Values:", formValues); // Kiểm tra giá trị của form
  }, [form]); // Hook này sẽ chạy mỗi khi form thay đổi

  const handleBankChange = (bankId: string) => {
    const beneficiaryId = form.getFieldValue(messages.form.beneficiaryId.name);
    if (bankId && beneficiaryId) {
      fetchBeneficiaryName(bankId, beneficiaryId);
    }
  };

  const handleBeneficiaryIdChange = (beneficiaryId: string) => {
    const bankId = form.getFieldValue(messages.form.bank.name);
    if (bankId && beneficiaryId) {
      fetchBeneficiaryName(bankId, beneficiaryId);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        label={messages.form.bank.label}
        name={messages.form.bank.name}
      >
        <Select
          options={banks.map((bank) => ({
            value: bank.id,
            label: bank.name,
          }))}
          disabled={mode !== "add"}
          onChange={handleBankChange}
          placeholder={messages.form.bank.placeholder}
        />
      </Form.Item>

      <Form.Item
        label={messages.form.beneficiaryId.label}
        name={messages.form.beneficiaryId.name}
        rules={[
          { required: true, message: "Vui lòng nhập ID người thụ hưởng!" },
        ]}
      >
        <Input onChange={(e) => handleBeneficiaryIdChange(e.target.value)} />
      </Form.Item>

      <Form.Item
        label={messages.form.beneficiaryName.label}
        name={messages.form.beneficiaryName.name}
      >
        <Input readOnly value={beneficiaryName} />
      </Form.Item>

      <Form.Item
        label={messages.form.nickname.label}
        name={messages.form.nickname.name}
        rules={[{ required: true, message: "Vui lòng nhập tên gợi nhớ!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          {messages.form.submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
