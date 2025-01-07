import React, { useEffect, useState } from "react";
import { Alert, Flex, Select, Spin, Typography } from "antd";
import MoneyFlowChart from "@features/customer/dashboard/components/MoneyFlowChart";
import AccountCard from "@features/account/components/AccountCard";
import DashboardDebtCard from "@features/customer/dashboard/components/DashboardDebtCard";
import DashboardHistoryCard from "@features/customer/dashboard/components/DashboardHistoryCard";
import useDashboardStore from "@features/customer/dashboard/stores/dashboardStore";
import { DebtCardTitle } from "@features/customer/dashboard/dashboardType";

interface ICustomerDashboardScreenProps {}

const CustomerDashboardScreen: React.FC<ICustomerDashboardScreenProps> = () => {
  const {
    data,
    loading,
    error,
    fetchDashboardDataCard: fetchDashboardData,
    moneyFlow,
    fetchMoneyFlowData,
    mode,
    setMode,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    console.log("mode", mode);
    fetchMoneyFlowData();
  }, [mode, fetchMoneyFlowData]);

  const handleChange = (value: string) => {
    setMode(value);
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
            title={DebtCardTitle.CREATED}
            value={`${debtData?.totalDebtCreatedCurrentMonth || 0}`}
            percentage={debtData?.debtCreationRate || 0}
            month={currentMonthYear}
          />
          <DashboardDebtCard
            title={DebtCardTitle.PAID}
            value={(debtData?.totalPaidCurrentMonth || 0).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
            percentage={debtData?.paidRate || 0}
            month={currentMonthYear}
          />
          <DashboardDebtCard
            title={DebtCardTitle.BE_PAID}
            value={(debtData?.totalBePaidCurrentMonth || 0).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
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
                value={mode}
                style={{ width: 125 }}
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
              <MoneyFlowChart mode={mode} data={moneyFlow || undefined} />
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
