'use client';

import { useRef } from 'react';
import { SSearchTable, SButton } from '@dalydb/sdesign';
import type { SSearchTableRef, SColumnsType, ModalContainerRef } from '@dalydb/sdesign';
import { Modal, message, Tag } from 'antd';
import { userApi } from '@/lib/services';
import type { User } from '@/lib/services/modules/user/user.types';
import UserFormModal from './components/FormModal';

export default function UserListPage() {
  const tableRef = useRef<SSearchTableRef>(null);
  const modalRef = useRef<ModalContainerRef<{ record?: User }>>(null);

  const columns: SColumnsType<User> = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '用户名', dataIndex: 'username' },
    { title: '邮箱', dataIndex: 'email' },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'default'}>
          {status === 1 ? '正常' : '禁用'}
        </Tag>
      ),
    },
    { title: '注册时间', dataIndex: 'created_at', render: 'datetime' },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (_, record) => (
        <>
          <SButton
            actionType="edit"
            onClick={() => modalRef.current?.open({ record })}
          />
          <SButton
            actionType="delete"
            onClick={() => {
              Modal.confirm({
                title: '确认删除？',
                content: `确定要删除用户「${record.username}」吗？`,
                onOk: async () => {
                  await userApi.delete(record.id);
                  message.success('删除成功');
                  tableRef.current?.refresh();
                },
              });
            }}
          />
        </>
      ),
    },
  ];

  const searchItems = [
    { label: '用户名', name: 'username', type: 'input' as const },
    { label: '邮箱', name: 'email', type: 'input' as const },
    {
      label: '角色', name: 'role', type: 'select' as const,
      fieldProps: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
        ],
      },
    },
    {
      label: '状态', name: 'status', type: 'select' as const,
      fieldProps: {
        options: [
          { label: '正常', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
  ];

  return (
    <>
      <SSearchTable
        ref={tableRef}
        headTitle={{
          children: '用户管理',
          actionNode: (
            <SButton
              actionType="create"
              onClick={() => modalRef.current?.open({})}
            />
          ),
        }}
        requestFn={async (params) => {
          const res = await userApi.getList(params);
          return {
            dataList: res.data?.list || [],
            totalSize: res.data?.total || 0,
          };
        }}
        formProps={{ items: searchItems, columns: 3 }}
        tableProps={{ columns, rowKey: 'id' }}
      />
      <UserFormModal
        ref={modalRef}
        onSuccess={() => tableRef.current?.refresh()}
      />
    </>
  );
};
