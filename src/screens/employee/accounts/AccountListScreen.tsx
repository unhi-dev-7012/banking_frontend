import React, { useEffect, useState } from "react";
import { message, TablePaginationConfig, Typography } from "antd";
import { useCustomerManagement } from "../../../features/employee/customers/stores/useCustomerManagement";
import TableComponent from "../../../components/common/Table/TableComponent";
import { CustomerManagementColumnConfig } from "../../../features/employee/customers/components/TableCustomerManagementConfig/CustomerManagementColumnConfig";
import DetailCustomerInfoModal from "../../../features/employee/customers/components/Modal/DetailCustomerInfoModal";

const { Title } = Typography;

const AccountListScreen: React.FC = () => {
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const {
    customers,
    fetchCustomers,
    loading,
    error,
    pagination,
    setPagination,
  } = useCustomerManagement();

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
    });
  };

  useEffect(() => {
    fetchCustomers();
    if (error) {
      message.error(error);
    }
  }, []);

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Quản lý khách hàng</Title>

      <TableComponent<Record<string, any>>
        datasource={customers}
        pagination={pagination}
        columns={CustomerManagementColumnConfig(
          setIsDetailModalVisible,
          setSelectedCustomer
        )}
        handleTableChange={handleTableChange}
        loading={loading}
      />

      <DetailCustomerInfoModal
        visible={isDetailModalVisible}
        setVisible={setIsDetailModalVisible}
        customer={selectedCustomer}
      />
    </div>
  );
};

AccountListScreen.displayName = "AccountListScreen";

export default AccountListScreen;
