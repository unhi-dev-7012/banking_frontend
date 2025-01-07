import { useEffect } from "react";
import { useEmployeeStore } from "../stores/employeeStore";
import {
  Button,
  message,
  Modal,
  TableColumnsType,
  TablePaginationConfig,
  Tag,
} from "antd";
import TableComponent from "@components/common/Table/TableComponent";
import { Employee } from "../employeeType";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { blockEmployee } from "../services/blockEmployee";

const tagMessage = (isBlocked: boolean): string => {
  return isBlocked ? "Đã khóa" : "Đang hoạt động";
};

const tagColor = (isBlocked: boolean): string => {
  return isBlocked ? "volcano" : "green";
};

const EmployeeTable: React.FC = () => {
  const { data, pagination, loading, fetchTableData, setPagination } =
    useEmployeeStore();

  useEffect(() => {
    fetchTableData();
  }, [pagination.current, pagination.total]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
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
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await blockEmployee(id, !isBlocked);
          message.success(actionSuccessMessage);
          fetchTableData();
        } catch (error) {
          message.error("Không thể thực hiện hành động này.");
        }
      },
    });
  };

  const columns: TableColumnsType<Employee> = [
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
      render: (_, { createdAt }) => <>{new Date(createdAt).toLocaleString()}</>,
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

  return (
    <TableComponent<Employee>
      rowKey="id"
      datasource={data}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
      columns={columns}
    />
  );
};

export default EmployeeTable;
