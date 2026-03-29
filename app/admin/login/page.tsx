'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        // 保存 token 到 localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        message.success('登录成功！');
        router.push('/admin/dashboard');
      } else {
        message.error(data.message || '登录失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={2} style={{ margin: 0 }}>后台管理系统</Title>
          <p style={{ color: '#999', marginTop: 8 }}>欢迎登录</p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <a href="/admin/forgot-password" style={{ color: '#999', fontSize: 12 }}>
              忘记密码？
            </a>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
              style={{ marginTop: 8 }}
            >
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', fontSize: 12, color: '#999' }}>
            <p style={{ margin: '8px 0' }}>默认账户：admin / admin123</p>
            <p style={{ margin: 0 }}>
              还没有账户？{' '}
              <a href="/admin/register" style={{ color: '#1890ff' }}>立即注册</a>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
}
