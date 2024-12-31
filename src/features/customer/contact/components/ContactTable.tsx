import React, { useContext, useEffect } from "react";
import { ContactContext } from "./ContactContext";
import TableComponent from "@components/common/Table/TableComponent";
import { contactColumns } from "./contactColumns";
import { Contact } from "../contact.type";
import { message, Modal, TablePaginationConfig } from "antd";
import api from "@utils/api";

export interface ContactTableProps {
  editRecord: (record: Contact) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({ editRecord }) => {
  const { state, fetchContact, setPagination, fetchBanks } =
    useContext(ContactContext);
  const { data, pagination, loading, banks } = state;

  useEffect(() => {
    const fetchData = async () => {
      const banks = await fetchBanks();
      console.log(banks);
      await fetchContact(banks, pagination);
    };
    fetchData();
  }, []);

  const deleteRecord = (record: any) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa người nhận này?",
      content: `Hành động này sẽ xóa tài khoản ${record.beneficiaryId} khỏi danh bạ của bạn.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "HủyHủy",
      onOk: async () => {
        try {
          await api.delete(`api/customer/v1/contact/${record.id}`);
          await fetchContact(banks, pagination);
          message.success("Xóa thành công!");
        } catch (error) {
          console.error("Failed to delete contact:", error);
          message.error("Xóa thất bại!");
        }
      },
    });
  };

  const handleTableChange = (data: TablePaginationConfig) => {
    setPagination({
      current: data.current,
    });

    fetchContact(banks, data);
  };

  return (
    <TableComponent<Contact>
      rowKey="id"
      datasource={data}
      columns={contactColumns({ editRecord, deleteRecord })}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
    />
  );
};
