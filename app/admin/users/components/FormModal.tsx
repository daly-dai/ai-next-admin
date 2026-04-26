'use client';

import { Modal, message } from 'antd';
import { createModal, SForm } from '@dalydb/sdesign';
import type { ModalChildProps, SFormItems } from '@dalydb/sdesign';
import { useRequest } from 'ahooks';
import { userApi } from '@/lib/services';
import type { User, CreateUserInput } from '@/lib/services/modules/user/user.types';

type Params = { record?: User };

const FormContent = ({ params, open, onClose, onSuccess }: ModalChildProps<Params>) => {
  const [form] = SForm.useForm();
  const isEdit = !!params.record;

  const { run: submit, loading } = useRequest(
    async (values: CreateUserInput) => {
      if (isEdit) {
        await userApi.update(params.record!.id, values);
      } else {
        await userApi.create(values);
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(isEdit ? '更新成功' : '创建成功');
        onSuccess?.();
      },
    },
  );

  useRequest(() => userApi.getById(params.record!.id), {
    ready: isEdit && !!params.record,
    onSuccess: (res) => {
      if (res.data) form.setFieldsValue(res.data);
    },
  });

  const items: SFormItems[] = [
    { label: '用户名', name: 'username', type: 'input', rules: [{ required: true, message: '请输入用户名' }] },
    { label: '邮箱', name: 'email', type: 'input', rules: [{ required: true, message: '请输入邮箱' }] },
    {
      label: '密码', name: 'password', type: 'password',
      rules: isEdit ? [] : [{ required: true, message: '请输入密码' }],
    },
    {
      label: '角色', name: 'role', type: 'select',
      fieldProps: {
        options: [
          { label: '普通用户', value: 'user' },
          { label: '管理员', value: 'admin' },
        ],
      },
    },
  ];

  return (
    <Modal
      title={isEdit ? '编辑用户' : '新增用户'}
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={loading}
      destroyOnClose
    >
      <SForm form={form} items={items} onFinish={submit} />
    </Modal>
  );
};

export default createModal<Params>(FormContent);
