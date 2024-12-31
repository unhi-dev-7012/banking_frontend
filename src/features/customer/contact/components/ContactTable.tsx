import React, { useContext, useEffect } from "react";
import { ContactContext } from "./ContactContext";
import TableComponent from "@components/common/Table/TableComponent";
import { contactColumns } from "./contactColumns";
import { Contact } from "../contact.type";
import { TablePaginationConfig } from "antd";

export const ContactTable: React.FC = () => {
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
      columns={contactColumns}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
    />
  );
};
