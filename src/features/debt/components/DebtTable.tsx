import TabComponent from "@components/common/Tab/TabComponent";
import { Debt, DebtTabItem } from "../debtType";
import { Spinner } from "@components/common/Spinner";
import DebtListUI from "./DebtListUI";
import { Modal } from "antd";

interface DebtTableProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  debts: Debt[];
  loading: boolean;
  onCancel: (debtId: string) => void;
  onPay: (debtId: string) => void;
}

const DebtTable: React.FC<DebtTableProps> = ({
  activeTab,
  setActiveTab,
  debts,
  loading,
  onCancel,
  onPay,
}) => {
  const defaultActiveTab = DebtTabItem.find((item) => item.key === activeTab);

  const handleCancelDebt = (debtId: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn hủy nợ này?",
      onOk: () => {
        onCancel(debtId); // Gọi handler hủy nợ
      },
    });
  };

  // Xử lý xác nhận hành động Thanh toán nợ
  const handlePayDebt = (debtId: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thanh toán nợ này?",
      onOk: () => {
        onPay(debtId); // Gọi handler thanh toán nợ
      },
    });
  };

  return (
    <>
      <TabComponent
        items={DebtTabItem}
        onTabChange={setActiveTab}
        defaultActiveKey={defaultActiveTab || DebtTabItem[0]}
      />
      {loading ? (
        <Spinner size="small" />
      ) : (
        <DebtListUI
          debts={debts}
          activeTab={activeTab}
          onCancel={handleCancelDebt} // Truyền handler vào DebtListUI
          onPay={handlePayDebt} // Truyền handler vào DebtListUI
        />
      )}
    </>
  );
};

export default DebtTable;
