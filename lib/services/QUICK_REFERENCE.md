# API 服务层快速参考

## 📦 导入方式

```typescript
// 导入 API
import { userApi, authApi, statsApi } from '@/lib/services';

// 导入类型
import type { User, CreateUserInput, LoginInput } from '@/lib/services';
```

## 🔑 常用 API 方法

### 用户管理

```typescript
// 获取列表（分页）
userApi.getList({ page: 1, limit: 10 })

// 创建
userApi.create({ username, email, password, role })

// 更新
userApi.update(id, data)

// 删除
userApi.delete(id)

// 获取单个
userApi.getById(id)
```

### 认证

```typescript
// 登录
authApi.login({ username, password })

// 注册
authApi.register({ username, email, password })

// 获取当前用户
authApi.getCurrentUser()

// 退出
authApi.logout()
```

### 统计

```typescript
// 获取统计数据
statsApi.getStats()
```

## 🎯 标准响应格式

```typescript
interface ApiResponse<T> {
  success: boolean;
  code?: number;
  message: string;
  data?: T;
}
```

## 📝 使用示例

```typescript
const fetchUsers = async () => {
  try {
    const result = await userApi.getList({ page: 1, limit: 10 });
    
    if (result.success && result.data) {
      setUsers(result.data.items);
      setTotal(result.data.total);
    }
  } catch (error) {
    message.error('加载失败');
  }
};
```

## 🔧 新增模块步骤

1. 在 `modules/` 下创建新目录
2. 创建 `*.api.ts` 和 `*.types.ts`
3. 创建 `index.ts` 导出
4. 在总入口 `index.ts` 添加导出

详细文档请查看 [README.md](./README.md)
