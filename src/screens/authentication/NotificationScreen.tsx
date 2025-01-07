import React, { useEffect } from "react";
import {
  Typography,
  Tag,
  Pagination,
  List,
  Divider,
  Row,
  Col,
  message,
  Button,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNotification } from "../../features/customer/notification/stores/useNotification";
import { setupOnMessageHandler } from "../../config/firebase";
import TabComponent from "../../components/common/Tab/TabComponent";
import {
  NotificationTabs,
  NotificationType,
} from "../../features/customer/notification/notificationType";

const NotificationScreen: React.FC = () => {
  const {
    fetchNotification,
    notifications = [],
    pagination,
    error,
    type,
    setType,
    loading,
    setPagination,
    setUnread,
    unreads,
    markAsRead,
  } = useNotification();

  useEffect(() => {
    setType(undefined);
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [pagination.current, type, unreads]);

  useEffect(() => {
    setupOnMessageHandler([fetchNotification, setUnread]);
  }, [fetchNotification]);

  const handleTabChange = (key: string) => {
    if (key === "all") {
      setPagination({ current: 1 });
      setType(undefined);
      if (error) {
        message.error(error);
      }
    } else {
      setPagination({ current: 1 });
      setType(key as NotificationType);
    }
  };

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

  const renderIcon = (type: string) => {
    switch (type) {
      case "debt_created_for_you":
        return <BellOutlined style={{ fontSize: 20, color: "#fa541c" }} />;
      case "balance_update":
        return <BellOutlined style={{ fontSize: 20, color: "#52c41a" }} />;
      case "debt_cancel":
        return <BellOutlined style={{ fontSize: 20, color: "#1890ff" }} />;
      default:
        return <BellOutlined style={{ fontSize: 20, color: "#d9d9d9" }} />;
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAsRead();
    await setUnread();
  };

  return (
    <div>
      <Typography.Title level={2} className="titleTypography">
        Thông báo
      </Typography.Title>

      <TabComponent
        defaultActiveKey={NotificationTabs[0]}
        items={NotificationTabs}
        onTabChange={handleTabChange}
      />

      <Button
        type="primary"
        disabled={unreads !== 0 ? false : true}
        onClick={handleMarkAllAsRead}
        style={{ marginBottom: 16 }}
      >
        Đánh dấu tất cả là đã đọc
      </Button>

      <List
        dataSource={notifications}
        loading={loading}
        renderItem={(notification) => (
          <List.Item
            style={{
              padding: "24px",
              borderBottom: "1px solid #f0f0f0",
              borderRadius: "8px",
              backgroundColor: notification.readAt ? "#fafafa" : "#f4f8fb",
              marginBottom: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              alignItems: "center",
            }}
          >
            <Row style={{ width: "100%" }} align="middle">
              <Col style={{ marginRight: 16 }}>
                {renderIcon(notification.type)}
              </Col>
              <Col flex="auto">
                <Typography.Text strong style={{ fontSize: 16 }}>
                  {notification.title}
                </Typography.Text>
                <Row gutter={8} style={{ marginTop: 8 }} align="middle">
                  <Col>{renderTag(notification.type)}</Col>
                  <Col flex="auto">
                    <Typography.Text
                      type="secondary"
                      style={{ display: "block" }}
                    >
                      {notification.body}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: 12, textAlign: "right" }}
                    >
                      {new Date(notification.createdAt).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}{" "}
                      {new Date(notification.createdAt).toLocaleTimeString(
                        "vi-VN"
                      )}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
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
