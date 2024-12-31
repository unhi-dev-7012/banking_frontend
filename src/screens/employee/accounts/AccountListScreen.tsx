import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  message,
  Row,
  TablePaginationConfig,
  Typography,
} from "antd";
import { useCustomerManagement } from "../../../features/employee/customers/stores/useCustomerManagement";
import TableComponent from "../../../components/common/Table/TableComponent";
import { CustomerManagementColumnConfig } from "../../../features/employee/customers/components/TableCustomerManagementConfig/CustomerManagementColumnConfig";
import DetailCustomerInfoModal from "../../../features/employee/customers/components/Modal/DetailCustomerInfoModal";
import AddCustomerModal from "../../../features/employee/customers/components/Modal/AddCustomerModal";

const { Title } = Typography;

const AccountListScreen: React.FC = () => {
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

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
  }, [pagination.current, pagination.total]);

  return (
    <div style={{ padding: 12, maxHeight: "100vh", overflow: "auto" }}>
      <Title level={2}>Quản lý khách hàng</Title>

      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
            + Thêm khách hàng
          </Button>
        </Col>
      </Row>

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

      <AddCustomerModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
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
