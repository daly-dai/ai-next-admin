'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title } = Typography;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // TODO: 实现发送重置密码邮件的 API
      message.success('重置密码邮件已发送，请检查邮箱');
      console.log('发送重置密码邮件到:', values.email);
    } catch (error) {
      message.error('发送失败，请稍后重试');
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
          <Title level={2} style={{ margin: 0 }}>忘记密码</Title>
          <p style={{ color: '#999', marginTop: 8 }}>重置您的密码</p>
        </div>

        <Form
          name="forgotPassword"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <div style={{ 
            padding: '16px', 
            background: '#f5f5f5', 
            borderRadius: 4, 
            marginBottom: 24,
            fontSize: 14,
            color: '#666'
          }}>
            请输入您的注册邮箱，我们将发送重置密码的链接到您的邮箱。
          </div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="注册邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
              style={{ marginTop: 8 }}
            >
              发送重置邮件
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link href="/admin/login" style={{ color: '#1890ff', fontSize: 14 }}>
              <ArrowLeftOutlined /> 返回登录页
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
