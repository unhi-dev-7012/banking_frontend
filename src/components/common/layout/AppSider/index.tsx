import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Spin,
  Typography,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EROLE } from "@constants/authorization";
import { ROUTES_PATH } from "@constants/path";
import {
  ArrowRightCircle,
  Bell,
  Clock,
  CreditCard,
  FileText,
  History,
  Home,
  LogOut,
  UserPlus,
  UserRound,
  UserRoundCog,
  Users,
  UsersRound,
} from "lucide-react";
import "./index.css";
import { useAppStore } from "@stores/app";
import { useAuthStore } from "@features/auth/stores/authStore";
import { getUserData, UserData } from "@features/auth/services/getUserData";
import { useNotification } from "../../../../features/customer/notification/stores/useNotification";
import onlyLogo from "@assets/images/only_logo.png";

type MenuItem = Required<MenuProps>["items"][number];

export const AppSider: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname || "/";
  const { isSiderCollapsed } = useAppStore();
  const { role, socket, handleLogout } = useAuthStore();
  const { unreads, setUnread } = useNotification();

  const [bottomSelectedKey, setBottomSelectedKey] = useState<string>("");

  // const [userData, setUserData] = useState<UserData>({
  //   fullName: "Unknown User",
  //   email: "unknown@example.com",
  // });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getUserData();

    //   if (data) {
    //     setUserData(data);
    //   }
    // };
    const fetchData = async () => {
      try {
        const data = await getUserData();
        if (data) {
          setUserData(data);
          socket?.emit("register", { userId: data.id });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if (role === EROLE.CUSTOMER) {
      setUnread();
    }
  }, []);

  const checkRole = (requiredRoles: EROLE[]) => {
    if (requiredRoles.length === 0) return true;
    return requiredRoles.includes(role as EROLE);
  };

  // Generate menu item
  const getItem = (props: {
    key: React.Key;
    label: React.ReactNode;
    icon?: React.ReactNode;
    path?: string;
    children?: MenuItem[];
    type?: "group";
    title?: string;
    className?: string;
    requiredRoles?: EROLE[];
  }): MenuItem | null => {
    if (!checkRole(props.requiredRoles || [])) return null;

    return {
      key: props.key,
      label: props.label,
      icon: props.icon,
      children: props.children,
      type: props.type,
      title: props.title,
      className: props.className,
      onClick: () => {
        if (!props.path) return;
        navigate(props.path);
        setBottomSelectedKey(props.path);
      },
    } as MenuItem;
  };

  const topMenuItems: MenuProps["items"] = [
    //Start - customer

    getItem({
      key: ROUTES_PATH.CUSTOMER.DASHBOARD,
      label: "Trang chủ",
      icon: <Home size={20} />,
      path: ROUTES_PATH.CUSTOMER.DASHBOARD,
      requiredRoles: [EROLE.CUSTOMER],
    }),
    getItem({
      key: ROUTES_PATH.CUSTOMER.TRANSFER,
      label: "Chuyển tiền",
      icon: <ArrowRightCircle size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.CUSTOMER.INTERNAL_TRANSFER,
          label: "Chuyển tiền trong ngân hàng",
          path: ROUTES_PATH.CUSTOMER.INTERNAL_TRANSFER,
          requiredRoles: [EROLE.CUSTOMER],
        }),
        getItem({
          key: ROUTES_PATH.CUSTOMER.EXTERNAL_TRANSFER,
          label: "Chuyển tiền liên ngân hàng",
          path: ROUTES_PATH.CUSTOMER.EXTERNAL_TRANSFER,
          requiredRoles: [EROLE.CUSTOMER],
        }),
      ],
      requiredRoles: [EROLE.CUSTOMER],
    }),
    getItem({
      key: ROUTES_PATH.CUSTOMER.ACCOUNT,
      label: "Tài khoản",
      icon: <CreditCard size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.CUSTOMER.ACCOUNT_LIST,
          label: "Danh sách tài khoản",
          path: ROUTES_PATH.CUSTOMER.ACCOUNT_LIST,
          requiredRoles: [EROLE.CUSTOMER],
        }),
      ],
      requiredRoles: [EROLE.CUSTOMER],
    }),

    getItem({
      key: ROUTES_PATH.CUSTOMER.DEBT,
      label: "Quản lý nợ",
      icon: <FileText size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.CUSTOMER.DEBT_LIST,
          label: "Danh sách nợ",
          path: ROUTES_PATH.CUSTOMER.DEBT_LIST,
          requiredRoles: [EROLE.CUSTOMER],
        }),
      ],
      requiredRoles: [EROLE.CUSTOMER],
    }),
    getItem({
      key: ROUTES_PATH.CUSTOMER.CONTACT,
      label: "Danh bạ",
      icon: <UserPlus size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.CUSTOMER.CONTACT_LIST,
          label: "Danh sách người nhận",
          path: ROUTES_PATH.CUSTOMER.CONTACT_LIST,
          requiredRoles: [EROLE.CUSTOMER],
        }),
      ],
      requiredRoles: [EROLE.CUSTOMER],
    }),

    getItem({
      key: ROUTES_PATH.CUSTOMER.HISTORY,
      label: "Lịch sử giao dịch",
      icon: <History size={20} />,
      path: ROUTES_PATH.CUSTOMER.HISTORY,
      requiredRoles: [EROLE.CUSTOMER],
    }),
    // End customer

    //Start Employee
    getItem({
      key: ROUTES_PATH.EMPLOYEE.CUSTOMER,
      label: "Quản lý tài khoản",
      icon: <UsersRound size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.EMPLOYEE.CUSTOMER_LIST,
          label: "Danh sách tài khoản",
          path: ROUTES_PATH.EMPLOYEE.CUSTOMER_LIST,
          requiredRoles: [EROLE.EMPLOYEE],
        }),
      ],
      requiredRoles: [EROLE.EMPLOYEE],
    }),
    getItem({
      key: ROUTES_PATH.EMPLOYEE.HISTORY,
      label: "Lịch sử giao dịch",
      icon: <History size={20} />,
      path: ROUTES_PATH.EMPLOYEE.HISTORY,
      requiredRoles: [EROLE.EMPLOYEE],
    }),
    //End Employee

    //Start Admin
    getItem({
      key: ROUTES_PATH.ADMIN.DASHBOARD,
      label: "Trang chủ",
      icon: <Home size={20} />,
      path: ROUTES_PATH.ADMIN.DASHBOARD,
      requiredRoles: [EROLE.ADMIN],
    }),

    getItem({
      key: ROUTES_PATH.ADMIN.EMPLOYEE,
      label: "Quản lý nhân viên",
      icon: <Users size={20} />,
      children: [
        getItem({
          key: ROUTES_PATH.ADMIN.EMPLOYEE_LIST,
          label: "Danh sách nhân viên",
          path: ROUTES_PATH.ADMIN.EMPLOYEE_LIST,
          requiredRoles: [EROLE.ADMIN],
        }),
      ],
      requiredRoles: [EROLE.ADMIN],
    }),
    //End Admin
  ];

  const bottomMenuItems: MenuProps["items"] = [
    {
      key: "Profile",
      label: loading ? (
        <Spin />
      ) : (
        <Flex align="center" style={{ padding: "12px 0px 10px" }}>
          {localStorage.getItem("role") &&
          localStorage.getItem("role") === EROLE.CUSTOMER ? (
            <Badge count={unreads} size="default" color="blue">
              <Avatar shape="square" size={40} icon={<UserRound size={20} />} />
            </Badge>
          ) : (
            <Avatar shape="square" size={40} icon={<UserRound size={20} />} />
          )}

          <Flex
            vertical
            style={{ flex: 1, marginLeft: 16 }}
            className="userProfileContainer"
          >
            <Typography.Text strong>{userData?.fullName}</Typography.Text>
            <Typography.Text type="secondary">
              {userData?.email}
            </Typography.Text>
          </Flex>
        </Flex>
      ),
      children: [
        getItem({
          key: "Notification",
          label: (
            <Flex align="center" gap={8} style={{ width: 140 }}>
              <Bell size={20} />
              <Flex align="center">
                Thông báo
                <Badge
                  count={unreads}
                  size="default"
                  style={{ marginLeft: 10 }}
                  color="blue"
                />
              </Flex>
            </Flex>
          ),
          path: ROUTES_PATH.NOTIFICATION,
          requiredRoles: [EROLE.CUSTOMER],
        }),
        getItem({
          key: "Setting",
          label: (
            <Flex align="center" gap={8} style={{ width: 140 }}>
              <UserRoundCog size={20} />
              Thông tin
            </Flex>
          ),
          path: ROUTES_PATH.PROFILE,
        }),
        {
          key: "Divider",
          type: "divider",
        },
        getItem({
          key: "Logout",
          label: (
            <Flex
              align="center"
              gap={8}
              style={{ width: 140 }}
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Đăng xuất
            </Flex>
          ),
          path: ROUTES_PATH.LOGIN,
        }),
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            activeBarBorderWidth: 0,
            itemBg: "transparent",
            subMenuItemBg: "transparent",
            itemPaddingInline: 12,
          },
        },
      }}
    >
      <Layout.Sider
        collapsible
        collapsed={isSiderCollapsed}
        theme="light"
        collapsedWidth={80}
        width={280}
        trigger={null}
        className="appSider"
        style={{
          backgroundColor: "transparent",
          padding: "16px 0 12px 12px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Flex
          align="center"
          justify={isSiderCollapsed ? "center" : "flex-start"}
          style={{
            height: 56,
            padding: isSiderCollapsed ? "0px" : "0px 20px",
            margin: isSiderCollapsed ? "0px 0px 30px 0" : "0px 10px 30px 0px",
          }}
        >
          <div className="appSider_LogoContainer">
            <img src={onlyLogo} alt="Not found!" />
          </div>
          {!isSiderCollapsed && (
            <span className="appSider_LogoText">NHBank</span>
          )}
        </Flex>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Menu
            selectedKeys={[selectedKey]}
            mode="inline"
            items={topMenuItems}
            className={isSiderCollapsed ? "appSider_TopMenuCollapsed" : ""}
          />

          <Menu
            mode="vertical"
            selectedKeys={[bottomSelectedKey || ""]}
            items={bottomMenuItems}
            onClick={(e) => {
              setBottomSelectedKey(e.key);
            }}
            className={
              isSiderCollapsed
                ? "appSider_BottomMenuCollapsed"
                : "appSider_BottomMenu"
            }
          />
        </div>
      </Layout.Sider>
    </ConfigProvider>
  );
};
