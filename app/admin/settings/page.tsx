'use client';

import { Card, Typography, Form, Input, Button, message, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function SettingsPage() {
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    // TODO: 实现保存设置的 API
    message.success('设置保存成功（演示功能）');
    console.log('保存的设置:', values);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>系统设置</Title>

      <Card title="基本设置" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            siteName: '后台管理系统',
            siteDescription: '基于 Next.js + MySQL 的后台管理系统',
          }}
        >
          <Form.Item
            name="siteName"
            label="网站名称"
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input placeholder="请输入网站名称" />
          </Form.Item>

          <Form.Item
            name="siteDescription"
            label="网站描述"
          >
            <TextArea 
              placeholder="请输入网站描述" 
              rows={3}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="数据库配置信息">
        <Paragraph>
          <strong>数据库类型：</strong> MySQL<br/>
          <strong>连接状态：</strong> <span style={{ color: 'green' }}>● 已连接</span><br/>
          <strong>字符集：</strong> utf8mb4<br/>
          <strong>排序规则：</strong> utf8mb4_unicode_ci
        </Paragraph>
        
        <Divider />
        
        <Paragraph style={{ color: '#999', fontSize: 14 }}>
          💡 提示：数据库配置文件位于 <code>.env.local</code>，修改后需要重启开发服务器才能生效。
        </Paragraph>
      </Card>
    </div>
  );
}
