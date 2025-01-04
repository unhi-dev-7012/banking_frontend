import React from "react";
import { Flex, Select, Typography } from "antd";
import MoneyFlowChart from "@features/customer/dashboard/components/MoneyFlowChart";
import AccountCard from "@features/account/components/AccountCard";
import DashboardDebtCard from "@features/customer/dashboard/components/DashboardDebtCard";
import DashboardHistoryCard from "@features/customer/dashboard/components/DashboardHistoryCard";

interface ICustomerDashboardScreenProps {}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const CustomerDashboardScreen: React.FC<ICustomerDashboardScreenProps> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2} style={{ margin: "0 0 10px 0" }}>
        Trang chủ
      </Typography.Title>
      <Flex gap={20} vertical>
        <Flex style={{ height: "225px" }} justify="space-between">
          <AccountCard />
          <DashboardDebtCard title="Tổng nợ đã tạo" />
          <DashboardDebtCard title="Tổng nợ đã trả" />
          <DashboardDebtCard title="Tổng nợ được trả" />
        </Flex>
        <Flex gap={20}>
          <Flex
            style={{
              width: "60%",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              height: "calc(100% - 225px)",
            }}
            vertical
          >
            <Flex
              justify="space-between"
              style={{ marginBottom: 10, marginTop: 10 }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                Thống kê chuyển khoản
              </Typography.Title>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "weekly", label: "Theo ngày" },
                  { value: "monthly", label: "Theo tháng" },
                ]}
              />
            </Flex>
            <div style={{ width: "100%" }}>
              <MoneyFlowChart />
            </div>
          </Flex>
          <DashboardHistoryCard />
        </Flex>
      </Flex>
    </div>
  );
};

CustomerDashboardScreen.displayName = "CustomerDashboardScreen";

export default CustomerDashboardScreen;
