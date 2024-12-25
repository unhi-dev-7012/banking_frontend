import { Modal } from "antd";
import React from "react";

interface ModalWrapperProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  children: React.ReactNode;
  onOk?: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  title,
  onCancel,
  children,
  onOk,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
