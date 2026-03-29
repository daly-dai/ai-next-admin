'use client';

import { useState, useEffect } from 'react';
import { Table, Card, Typography, Space, Button, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Article {
  id: number;
  title: string;
  content: string;
  author_id: number;
  status: number;
  views: number;
  created_at: string;
}

export default function ArticlesPage() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // TODO: 实现获取文章的 API
      // 这里使用示例数据
      setArticles([
        {
          id: 1,
          title: '欢迎使用后台管理系统',
          content: '这是一个基于 Next.js + MySQL 的后台管理系统示例...',
          author_id: 1,
          status: 1,
          views: 120,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: '学习 Next.js App Router',
          content: 'App Router 是 Next.js 13+ 的新特性，支持服务端组件...',
          author_id: 1,
          status: 1,
          views: 85,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('获取文章列表失败:', error);
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'default'}>
          {status === 1 ? '已发布' : '草稿'}
        </Tag>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: '发布时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => new Date(text).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Article) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 16 }}>文章管理</Title>
      
      <Card>
        <Table
          columns={columns}
          dataSource={articles}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
}
