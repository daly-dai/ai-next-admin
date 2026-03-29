"use client";

import { useState, useEffect, createElement } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layout, Menu, Typography, Avatar, Dropdown, message } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { isPublicPath } from "@/lib/constants";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: "/admin/dashboard",
    icon: <DashboardOutlined />,
    label: "数据统计",
  },
  {
    key: "/admin/users",
    icon: <TeamOutlined />,
    label: "用户管理",
  },
  {
    key: "/admin/articles",
    icon: <FileTextOutlined />,
    label: "文章管理",
  },
  {
    key: "/admin/settings",
    icon: <SettingOutlined />,
    label: "系统设置",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 如果是公开页面（如登录页），直接渲染 children，不使用布局
  if (isPublicPath(pathname)) {
    return children;
  }

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("已退出登录");
    router.push("/admin/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人中心",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: handleLogout,
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title
            level={4}
            style={{
              margin: 0,
              fontSize: collapsed ? 16 : 20,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {collapsed ? "Admin" : "后台管理系统"}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0, marginTop: 16 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: 18, cursor: "pointer" },
          })}

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068" }}
              />
              <span>{user.username}</span>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
