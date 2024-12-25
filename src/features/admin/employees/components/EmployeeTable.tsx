import React, { useEffect } from "react";
import { useEmployeeStore } from "../stores/employeeStore";
import { Table } from "antd";
import { Employee } from "../employeeType";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";

const EmployeeTable: React.FC = () => {
  const { employees, pagination, listEmployees } = useEmployeeStore();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    listEmployees(pagination.current || 1, pagination.pageSize || 10);
  };

  const columns: ColumnsType<Employee> = [
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  useEffect(() => {
    listEmployees(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  return (
    <Table<Employee>
      columns={columns}
      dataSource={employees}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      onChange={handleTableChange}
      rowKey={(record) => record.id}
    />
  );
};

export default EmployeeTable;
