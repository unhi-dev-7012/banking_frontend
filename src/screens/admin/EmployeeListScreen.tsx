import EmployeeForm from "@features/admin/employees/components/EmployeeForm";
import EmployeeTable from "@features/admin/employees/components/EmployeeTable";
import { Flex, Typography } from "antd";
import React from "react";

interface IEmployeeListScreenProps {}

const EmployeeListScreen: React.FC<IEmployeeListScreenProps> = () => {
  return (
    <Flex vertical gap="middle">
      <Typography.Title level={2}>Quản lý nhân viên</Typography.Title>
      <Typography.Text>
        Bạn có thể dùng trang này để quản lý tài khoản của nhân viên ngân hàng.
      </Typography.Text>
      <Flex justify="end">
        <EmployeeForm />
      </Flex>
      <EmployeeTable />
    </Flex>
  );
};

EmployeeListScreen.displayName = "EmployeeListScreen";

export default EmployeeListScreen;
