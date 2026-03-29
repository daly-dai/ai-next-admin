'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Typography, Space } from 'antd';
import { DashboardOutlined, CodeOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20,
    }}>
      <Card
        style={{
          maxWidth: 800,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={1} style={{ marginBottom: 8 }}>🎉 后台管理系统</Title>
          <Paragraph style={{ fontSize: 16, color: '#666' }}>
            基于 Next.js + MySQL 构建的现代化后台管理平台
          </Paragraph>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 20,
          marginBottom: 40,
        }}>
          <Card size="small" hoverable>
            <div style={{ textAlign: 'center' }}>
              <DashboardOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
              <Title level={5}>数据统计</Title>
              <Paragraph style={{ fontSize: 12, color: '#999' }}>
                实时数据看板，掌握业务动态
              </Paragraph>
            </div>
          </Card>

          <Card size="small" hoverable>
            <div style={{ textAlign: 'center' }}>
              <CodeOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
              <Title level={5}>用户管理</Title>
              <Paragraph style={{ fontSize: 12, color: '#999' }}>
                完善的 CRUD 操作，权限控制
              </Paragraph>
            </div>
          </Card>

          <Card size="small" hoverable>
            <div style={{ textAlign: 'center' }}>
              <BookOutlined style={{ fontSize: 48, color: '#722ed1', marginBottom: 16 }} />
              <Title level={5}>文章管理</Title>
              <Paragraph style={{ fontSize: 12, color: '#999' }}>
                内容管理系统，轻松管理文章
              </Paragraph>
            </div>
          </Card>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button 
              type="primary" 
              size="large"
              onClick={() => router.push('/admin/login')}
              style={{ width: 200 }}
            >
              进入后台
            </Button>
            <Button 
              size="large"
              href="https://nextjs.org/docs" 
              target="_blank"
              style={{ width: 200 }}
            >
              学习文档
            </Button>
          </Space>
        </div>

        <div style={{ 
          marginTop: 40, 
          padding: '20px', 
          background: '#f5f5f5', 
          borderRadius: 8 
        }}>
          <Title level={5} style={{ marginBottom: 12 }}>🚀 快速开始：</Title>
          <Paragraph style={{ fontSize: 14, lineHeight: 2 }}>
            1️⃣  配置数据库：编辑 <code>.env.local</code> 文件<br/>
            2️⃣  初始化数据库：运行 <code>pnpm db:init</code><br/>
            3️⃣  启动开发服务器：运行 <code>pnpm dev</code><br/>
            4️⃣  访问登录页面：<code>http://localhost:3000/admin/login</code><br/>
            5️⃣  默认账户：<code>admin / admin123</code>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
