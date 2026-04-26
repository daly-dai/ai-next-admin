"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Typography,
  Spin,
  Empty,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { statsApi, userApi, User } from "@/lib/services";

const { Title } = Typography;

interface StatsData {
  overview: {
    users: number;
    articles: number;
    views: number;
  };
  recentUsers: User[];
  popularArticles: any[];
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await statsApi.getStats();

      if (data.success && data.data) {
        setStats(data.data as StatsData);
      }
    } catch (error) {
      console.error("获取统计数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!stats) {
    return <Empty description="暂无数据" />;
  }

  const userColumns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "注册时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => new Date(text).toLocaleString("zh-CN"),
    },
  ];

  const articleColumns = [
    {
      title: "文章标题",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "浏览量",
      dataIndex: "views",
      key: "views",
      sorter: (a: any, b: any) => a.views - b.views,
      render: (views: number) => (
        <span>
          <EyeOutlined /> {views}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        数据统计
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.overview.users}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="文章总数"
              value={stats.overview.articles}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="总浏览量"
              value={stats.overview.views}
              prefix={<EyeOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="最近注册用户">
            <Table
              columns={userColumns}
              dataSource={stats.recentUsers}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="热门文章">
            <Table
              columns={articleColumns}
              dataSource={stats.popularArticles}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
