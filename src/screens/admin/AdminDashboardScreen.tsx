import React, { useEffect } from "react";
import {
  Card,
  ConfigProvider,
  DatePicker,
  Flex,
  Select,
  Typography,
} from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useReconcile } from "@features/admin/reconcile/stores/reconcileStore";
import ReconcileTable from "@features/admin/reconcile/components/ReconcileTable";
dayjs.locale("vi");

interface IAdminDashboardScreenProps {}

const AdminDashboardScreen: React.FC<IAdminDashboardScreenProps> = () => {
  const { Option } = Select;
  const ourBankCode = "NHB";
  const { banks, from, setSelectedMonth, setBankId, setBanks } = useReconcile();

  const handleChange = (_: any, dateString: string | string[]) => {
    setSelectedMonth(dateString as string);
  };

  const handleBankSelection = (value: any, _: any) => {
    setBankId(value);
  };

  useEffect(() => {
    setBanks();
    console.log(from);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        padding: "0px 14px 0px 14px",
      }}
    >
      <Flex gap="middle" justify="space-between" align="center">
        <Typography.Title level={2}>Đối soát</Typography.Title>
        <Flex gap="middle">
          <ConfigProvider locale={viVN}>
            <DatePicker picker="month" onChange={handleChange} />
            <Select
              style={{ width: 250 }}
              placeholder="Ngân hàng đối soát"
              onChange={handleBankSelection}
            >
              {banks.map((bank) =>
                bank.code !== ourBankCode ? (
                  <Option key={bank.id} value={bank.id}>
                    {bank.label}
                  </Option>
                ) : null
              )}
            </Select>
          </ConfigProvider>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between" gap="middle">
        <Card style={{ flexGrow: 1 }} size="small">
          <p>Số tiền đã ứng</p>
          <h2>
            {Number(1000000000).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
        </Card>
        <Card style={{ flexGrow: 1 }} size="small">
          <p>Số tiền được ứng</p>
          <h2>
            {Number(1000000000).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
        </Card>
        <Card style={{ flexGrow: 1 }} size="small">
          <p>Tổng số giao dịch</p>
          <h2>120</h2>
        </Card>
      </Flex>
      <Typography.Title level={4}>Danh sách giao dịch</Typography.Title>
      <ReconcileTable />
    </div>
  );
};

AdminDashboardScreen.displayName = "AdminDashboardScreen";

export default AdminDashboardScreen;
