import { ColumnsType } from "antd/es/table";
import { Contact } from "../contact.type";
import { Button, Flex } from "antd";
import { ContactTableProps } from "./ContactTable";
import { Pen, Trash } from "lucide-react";

interface ContactColumnProps extends ContactTableProps {
  deleteRecord: (record: Contact) => void;
}

export const contactColumns = ({
  editRecord,
  deleteRecord,
}: ContactColumnProps): ColumnsType<any> => [
  {
    title: "Số tài khoản người nhận",
    dataIndex: "beneficiaryId",
    key: "beneficiaryId",
  },
  {
    title: "Ngân hàng",
    dataIndex: "bankName",
    key: "bankName",
  },
  {
    title: "Tên người nhận",
    dataIndex: "beneficiaryName",
    key: "beneficiaryName",
  },
  {
    title: "Tên dễ nhớ",
    dataIndex: "nickname",
    key: "nickname",
  },
  {
    title: "Hành động",
    key: "actions",
    render: (_: any, record: Contact) => (
      <Flex gap="middle">
        <Button onClick={() => editRecord(record)}>
          <Pen size={12} />
        </Button>
        <Button danger onClick={() => deleteRecord(record)}>
          <Trash size={12} />
        </Button>
      </Flex>
    ),
  },
];
