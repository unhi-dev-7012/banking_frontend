import React, { useEffect } from "react";
import {
  Typography,
  Tag,
  Pagination,
  List,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import { useNotification } from "../../features/customer/notification/stores/useNotification";
import { setupOnMessageHandler } from "../../config/firebase";

const NotificationScreen: React.FC = () => {
  const {
    fetchNotification,
    notifications = [],
    pagination,
    setPagination,
  } = useNotification();

  useEffect(() => {
    fetchNotification();
  }, [pagination.current]);

  useEffect(() => {
    setupOnMessageHandler(fetchNotification);
  }, [fetchNotification]);

  useEffect(() => {
    fetchNotification();
  }, [pagination.current]);

  const renderTag = (type: string) => {
    let color;
    let text;
    switch (type) {
      case "debt_created_for_you":
        color = "volcano";
        text = "Nợ mới";
        break;
      case "balance_update":
        color = "green";
        text = "Cập nhật số dư";
        break;
      case "debt_cancel":
        color = "blue";
        text = "Hủy nợ";
        break;
      default:
        color = "default";
        text = "Thông báo";
    }
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <div style={{ padding: 24, alignItems: "center" }}>
      <Typography.Title level={2}>Thông báo</Typography.Title>

      <List
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item
            style={{
              padding: "32px 0",
              borderBottom: "1px solid #f0f0f0",
              alignItems: "center",
            }}
          >
            <Space size="large" style={{ width: "90%" }}>
              <div style={{ flex: 1 }}>
                <Typography.Text strong>{notification.title}</Typography.Text>
                <Row gutter={8} style={{ marginTop: 8, alignItems: "center" }}>
                  <Col>{renderTag(notification.type)}</Col>
                  <Col>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(notification.createdAt).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </Typography.Text>
                  </Col>
                </Row>
                <Typography.Text
                  type="secondary"
                  style={{ display: "block", marginTop: 8 }}
                >
                  {notification.body}
                </Typography.Text>
              </div>
            </Space>
          </List.Item>
        )}
        locale={{ emptyText: "Không có thông báo nào." }}
      />

      <Divider style={{ margin: "16px 0" }} />

      <Pagination
        style={{ textAlign: "center" }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page) => setPagination({ current: page })}
        showSizeChanger={false}
      />
    </div>
  );
};

NotificationScreen.displayName = "NotificationScreen";

export default NotificationScreen;
