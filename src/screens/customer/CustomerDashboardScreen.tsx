import React, { useEffect, useState } from "react";
import { Alert, Flex, Select, Spin, Typography } from "antd";
import MoneyFlowChart from "@features/customer/dashboard/components/MoneyFlowChart";
import AccountCard from "@features/account/components/AccountCard";
import DashboardDebtCard from "@features/customer/dashboard/components/DashboardDebtCard";
import DashboardHistoryCard from "@features/customer/dashboard/components/DashboardHistoryCard";
import useDashboardStore from "@features/customer/dashboard/stores/dashboardStore";

interface ICustomerDashboardScreenProps {}

const CustomerDashboardScreen: React.FC<ICustomerDashboardScreenProps> = () => {
  const { data, loading, error, fetchDashboardData } = useDashboardStore();
  const [chartMode, setChartMode] = useState("weekly");

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleChange = (value: string) => {
    setChartMode(value);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    );
  }

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = `Tháng ${currentDate.getMonth() + 1}`;
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth} - ${currentYear}`;

  const debtData = data?.debtCount;

  return (
    <div style={{ padding: "0px 20px 20px 20px" }}>
      <Typography.Title level={2} style={{ margin: "0 0 10px 0" }}>
        Trang chủ
      </Typography.Title>
      <Flex gap={20} vertical>
        <Flex style={{ height: "225px" }} justify="space-between">
          <AccountCard />
          <DashboardDebtCard
            title="Tổng nợ đã tạo"
            value={`${debtData?.totalDebtCreatedCurrentMonth || 0}đ`}
            percentage={debtData?.debtCreationRate || 0}
            month={currentMonthYear}
          />
          <DashboardDebtCard
            title="Tổng nợ đã trả"
            value={`${debtData?.totalPaidCurrentMonth || 0}đ`}
            percentage={debtData?.paidRate || 0}
            month={currentMonthYear}
          />
          <DashboardDebtCard
            title="Tổng nợ được trả"
            value={`${debtData?.totalBePaidCurrentMonth || 0}đ`}
            percentage={debtData?.bePaidRate || 0}
            month={currentMonthYear}
          />
        </Flex>
        <Flex gap={20} style={{ height: "calc(100% - 225px)" }}>
          <Flex
            style={{
              width: "68%",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "16px",
              height: "100%",
            }}
            vertical
          >
            <Flex
              justify="space-between"
              style={{ marginBottom: 10, marginTop: 10 }}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>
                Thống kê chuyển khoản
              </Typography.Title>
              <Select
                defaultValue="Trong tuần"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "weekly", label: "Trong tuần" },
                  { value: "monthly", label: "Trong tháng" },
                ]}
              />
            </Flex>
            <Flex
              style={{ width: "100%", height: "100%", padding: "20px 10px" }}
            >
              <MoneyFlowChart
                mode={chartMode}
                transactions={data?.recentTransactions || []}
              />
            </Flex>
          </Flex>
          <DashboardHistoryCard data={data?.recentTransactions} />
        </Flex>
      </Flex>
    </div>
  );
};

CustomerDashboardScreen.displayName = "CustomerDashboardScreen";

export default CustomerDashboardScreen;
