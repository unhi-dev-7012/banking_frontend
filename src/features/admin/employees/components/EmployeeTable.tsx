import React, { useEffect } from "react";
import { useEmployeeStore } from "../stores/employeeStore";
import { Button, message, Modal, Table, Tag } from "antd";
import { Employee } from "../employeeType";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import styles from "./table.module.css";
import { LockIcon, LockOpenIcon } from "lucide-react";

const EmployeeTable: React.FC = () => {
  const {
    employees,
    pagination,
    loading,
    totalItems,
    listEmployees,
    blockEmployee,
    setPagination,
  } = useEmployeeStore();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination.current || 1, pagination.pageSize || 10);
  };

  const tagMessage = (isBlocked: boolean): string => {
    return isBlocked ? "Đã khóa" : "Đang hoạt động";
  };

  const tagColor = (isBlocked: boolean): string => {
    return isBlocked ? "volcano" : "green";
  };

  const handleBlock = (id: string, isBlocked: boolean) => {
    const actionLabel = isBlocked ? "Mở khóa" : "Khóa";
    const actionConfirmMessage = isBlocked
      ? "Bạn có chắc chắn muốn mở khóa người dùng này?"
      : "Bạn có chắc chắn muốn khóa người dùng này?";
    const actionSuccessMessage = isBlocked
      ? "Người dùng đã được mở khóa thành công."
      : "Người dùng đã được khóa thành công.";

    Modal.confirm({
      title: actionConfirmMessage,
      content: `Hành động này sẽ ${actionLabel} người dùng.`,
      onOk: async () => {
        try {
          await blockEmployee(id, !isBlocked);
          message.success(actionSuccessMessage);
          listEmployees();
        } catch (error) {
          message.error("Không thể thực hiện hành động này.");
        }
      },
    });
  };

  const columns: ColumnsType<Employee> = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked) => (
        <>
          <Tag color={tagColor(isBlocked)}>{tagMessage(isBlocked)}</Tag>
        </>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          danger={record.isBlocked}
          icon={
            record.isBlocked ? (
              <LockIcon size={12} />
            ) : (
              <LockOpenIcon size={12} />
            )
          }
          title={record.isBlocked ? "Mở khóa" : "Khóa"}
          onClick={() => handleBlock(record.id, record.isBlocked)}
        ></Button>
      ),
    },
  ];

  const rowClassName = (_record: any, index: number): string => {
    return index % 2 === 1 ? styles.evenRow : styles.oddRow; // Dòng chẵn và lẻ
  };

  useEffect(() => {
    listEmployees();
  }, [pagination.current, pagination.pageSize]);

  return (
    <Table<Employee>
      columns={columns}
      dataSource={employees}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: totalItems,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      onChange={handleTableChange}
      rowKey={(record) => record.id}
      rowClassName={rowClassName}
      loading={loading}
    />
  );
};

export default EmployeeTable;
