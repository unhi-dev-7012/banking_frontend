import TabComponent from "@components/common/Tab/TabComponent";
import { Debt, DebtTabItem } from "../debtType";
import { Spinner } from "@components/common/Spinner";
import DebtList from "./DebtList";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { DebtView } from "./ViewDebtForm";
import { getDebtDetail } from "../services/getDebtDetail";
import useTransactionStore from "@features/customer/transfer_transaction/stores/transactionStore";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@constants/path";

interface DebtTableProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  debts: Debt[];
  loading: boolean;
  onCancel: (debtId: string) => void;
}

const DebtTable: React.FC<DebtTableProps> = ({
  activeTab,
  setActiveTab,
  debts,
  loading,
  onCancel,
}) => {
  const defaultActiveTab = DebtTabItem.find((item) => item.key === activeTab);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    createDebtTransaction,
    transaction,
    fetchBankAccountInfo,
    fetchAllBank,
  } = useTransactionStore();

  const [selectedDebt, setSelectedDebt] = useState<Debt | undefined>(); // State to store debt details
  const [loadingDebt, setLoadingDebt] = useState(false); // Loading state for debt details

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    fetchBankAccountInfo();
    fetchAllBank();
  }, []);

  const handleCancelDebt = (debtId: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn hủy nợ này?",
      onOk: async () => {
        try {
          await onCancel(debtId); // Gọi handler hủy nợ
        } catch (error) {
          message.error("Hủy nợ thất bại.");
        }
      },
    });
  };
  const navigate = useNavigate();
  // Xử lý xác nhận hành động Thanh toán nợ
  const handlePayDebt = (debtId: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thanh toán nợ này?",
      onOk: async () => {
        try {
          await createDebtTransaction(debtId);
          navigate(ROUTES_PATH.CUSTOMER.SETTLE_DEBT, {
            state: { transaction },
          });
        } catch (error) {
          message.error("Thanh toán nợ thất bại.");
        }
      },
    });
  };

  const handleViewDebt = async (debtId: string) => {
    setLoadingDebt(true);
    try {
      // Gọi API để lấy thông tin chi tiết của khoản nợ
      const debtDetails = await getDebtDetail(debtId);
      setSelectedDebt(debtDetails); // Lưu thông tin nợ vào state
      openModal(); // Mở modal khi đã có dữ liệu
    } catch (error) {
      message.error("Không thể tải thông tin chi tiết nợ.");
    } finally {
      setLoadingDebt(false);
    }
  };

  return (
    <>
      <Modal
        width={700}
        title="Thông tin chi tiết"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        {loadingDebt ? (
          <Spinner size="small" />
        ) : (
          <DebtView
            onPay={handlePayDebt}
            debt={selectedDebt as Debt}
            closeModal={closeModal}
          />
        )}
      </Modal>
      <TabComponent
        items={DebtTabItem}
        onTabChange={setActiveTab}
        defaultActiveKey={defaultActiveTab || DebtTabItem[0]}
      />
      {loading ? (
        <Spinner size="small" />
      ) : (
        <DebtList
          debts={debts}
          activeTab={activeTab}
          onCancel={handleCancelDebt} // Truyền handler vào DebtListUI
          onPay={handlePayDebt} // Truyền handler vào DebtListUI
          onView={handleViewDebt} // Truyền handler vào DebtListUI
        />
      )}
    </>
  );
};

export default DebtTable;
