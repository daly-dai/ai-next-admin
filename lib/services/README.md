# API 服务层架构文档

## 📁 目录结构

```
lib/services/
├── core/                    # 核心基础设施（不可变）
│   ├── http-client.ts      # 底层 HTTP 客户端封装
│   ├── interceptors.ts     # 请求/响应拦截器
│   ├── types.ts            # 基础类型定义
│   ├── constants.ts        # 常量配置
│   └── index.ts            # 核心导出
│
├── modules/                 # 业务模块（按需扩展）
│   ├── auth/               # 认证模块
│   │   ├── auth.api.ts     # API 调用
│   │   ├── auth.types.ts   # 类型定义
│   │   └── index.ts        # 统一导出
│   ├── user/               # 用户管理模块
│   │   ├── user.api.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   └── stats/              # 统计模块
│       ├── stats.api.ts
│       └── index.ts
│
└── index.ts                # 总入口（聚合所有模块）
```

## 🎯 架构设计理念

### 1. **分层架构**
- **核心层 (core/)**: HTTP 客户端、拦截器、基础类型
- **业务层 (modules/)**: 按业务领域划分的独立模块
- **统一入口 (index.ts)**: 聚合所有模块导出

### 2. **模块化设计**
每个业务模块：
- 独立的 API 定义 (`*.api.ts`)
- 独立的类型定义 (`*.types.ts`)
- 统一的导出 (`index.ts`)

### 3. **拦截器机制**
- **请求拦截器**: Token 自动注入、日志记录
- **响应拦截器**: 统一错误处理、401 自动跳转

## 📖 使用指南

### 基础导入

```typescript
// 导入 API 和类型
import { userApi, authApi, statsApi } from '@/lib/services';
import type { User, CreateUserInput } from '@/lib/services';
```

### 用户模块示例

#### 获取用户列表（分页）

```typescript
const fetchUsers = async () => {
  try {
    const data = await userApi.getList({ page: 1, limit: 10 });
    
    if (data.success && data.data) {
      console.log('用户列表:', data.data.items);
      console.log('总数:', data.data.total);
    }
  } catch (error) {
    console.error('获取失败:', error);
  }
};
```

#### 创建用户

```typescript
const handleCreate = async (values: CreateUserInput) => {
  try {
    const result = await userApi.create(values);
    
    if (result.success) {
      message.success('创建成功');
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error('操作失败');
  }
};
```

#### 更新用户

```typescript
const handleUpdate = async (id: number, data: UpdateUserInput) => {
  const result = await userApi.update(id, data);
  // ...
};
```

#### 删除用户

```typescript
const handleDelete = async (id: number) => {
  const result = await userApi.delete(id);
  // ...
};
```

### 认证模块示例

#### 用户登录

```typescript
const handleLogin = async (credentials: LoginInput) => {
  try {
    const result = await authApi.login(credentials);
    
    if (result.success && result.data) {
      // 保存 token
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      router.push('/admin/dashboard');
    }
  } catch (error) {
    message.error('登录失败');
  }
};
```

#### 退出登录

```typescript
const handleLogout = () => {
  authApi.logout(); // 自动清理 localStorage
  router.push('/login');
};
```

#### 获取当前用户

```typescript
const currentUser = await authApi.getCurrentUser();
```

### 统计模块示例

```typescript
const fetchStats = async () => {
  const data = await statsApi.getStats();
  
  if (data.success && data.data) {
    console.log('统计数据:', data.data);
  }
};
```

## 🔧 扩展新模块

### Step 1: 创建模块目录

```bash
lib/services/modules/article/
├── article.api.ts
├── article.types.ts
└── index.ts
```

### Step 2: 定义类型

```typescript
// article.types.ts
import { PaginatedResult } from '../../core/types';

export interface Article {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  author_id: number;
}

export type ArticleListResult = PaginatedResult<Article>;
```

### Step 3: 实现 API

```typescript
// article.api.ts
import { httpClient } from '../../core/http-client';
import * as Types from './article.types';

export const articleApi = {
  getList: (params: { page: number; limit: number }) => {
    return httpClient.request<Types.ArticleListResult>({
      url: '/articles',
      method: 'GET',
      params,
    });
  },

  getById: (id: number) => {
    return httpClient.request<Types.Article>({
      url: `/articles/${id}`,
      method: 'GET',
    });
  },

  create: (data: Types.CreateArticleInput) => {
    return httpClient.request<Types.Article>({
      url: '/articles',
      method: 'POST',
      body: data,
    });
  },

  update: (id: number, data: Partial<Types.CreateArticleInput>) => {
    return httpClient.request<Types.Article>({
      url: `/articles/${id}`,
      method: 'PUT',
      body: data,
    });
  },

  delete: (id: number) => {
    return httpClient.request({
      url: `/articles/${id}`,
      method: 'DELETE',
    });
  },
};
```

### Step 4: 统一导出

```typescript
// index.ts
export { articleApi } from './article.api';
export * from './article.types';
```

### Step 5: 添加到总入口

```typescript
// lib/services/index.ts
export { articleApi } from './modules/article';
export type { Article, CreateArticleInput } from './modules/article';
```

## ⚙️ 核心层说明

### HttpClient 类

提供完整的 HTTP 客户端功能：

- ✅ 请求超时控制
- ✅ 错误统一处理
- ✅ 拦截器支持
- ✅ 便捷的 CRUD 方法

```typescript
// 直接使用 httpClient（不推荐，除非需要自定义逻辑）
import { httpClient } from '@/lib/services';

const data = await httpClient.request<User>({
  url: '/users/1',
  method: 'GET',
});
```

### 拦截器

#### 请求拦截器

自动为所有请求添加 Token（除非设置 `skipAuth: true`）：

```typescript
// 在 core/interceptors.ts 中已配置
httpClient.useRequest((config) => {
  if (!config.skipAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});
```

#### 响应拦截器

统一处理 401 未授权错误：

```typescript
httpClient.useResponse((response) => {
  if (!response.success && response.code === 401) {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  }
  return response;
});
```

## 📋 API 方法命名规范

| 操作 | 方法名 | 参数示例 |
|------|--------|----------|
| 获取列表 | `getList` | `{ page: 1, limit: 10 }` |
| 获取单个 | `getById` | `(id)` |
| 创建 | `create` | `(data)` |
| 更新 | `update` | `(id, data)` |
| 删除 | `delete` | `(id)` |

## 🎨 最佳实践

### 1. **类型优先**

始终使用导出的类型定义：

```typescript
// ✅ 推荐
import type { User, CreateUserInput } from '@/lib/services';

const createUser = (data: CreateUserInput) => {
  // ...
};
```

### 2. **错误处理**

```typescript
try {
  const result = await userApi.create(data);
  if (result.success) {
    // 成功处理
  } else {
    message.error(result.message);
  }
} catch (error) {
  message.error('网络错误，请稍后重试');
  console.error(error);
}
```

### 3. **跳过认证**

某些接口（如登录、注册）不需要 Token：

```typescript
authApi.login(credentials); // 内部已设置 skipAuth: true
```

### 4. **模块职责单一**

每个模块只负责一个业务领域，不要跨模块调用。

## 🔄 迁移指南

### 从旧版 `lib/services/api.ts` 迁移

#### Before（旧版）

```typescript
import { userApi } from '@/lib/services/api';

const data = await userApi.getUsers(1, 10);
const result = await userApi.createUser(values);
```

#### After（新版）

```typescript
import { userApi } from '@/lib/services';

const data = await userApi.getList({ page: 1, limit: 10 });
const result = await userApi.create(values);
```

**变化点：**
1. 导入路径从 `@/lib/services/api` 改为 `@/lib/services`
2. `getUsers(page, pageSize)` → `getList({ page, limit: pageSize })`
3. `createUser()` → `create()`
4. 分页结果结构变化：`pagination` → 扁平化字段

## 📊 对比优势

| 特性 | 旧版（单文件） | 新版（模块化） |
|------|----------------|----------------|
| **可维护性** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **可扩展性** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **代码复用** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **协作友好** | ⭐ | ⭐⭐⭐⭐⭐ |
| **类型安全** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🚀 未来规划

- [ ] 集成 React Query / SWR 实现缓存和自动重新验证
- [ ] 添加请求重试机制
- [ ] 实现请求取消功能
- [ ] 添加请求性能监控
- [ ] 自动生成 API 类型（基于后端 OpenAPI/Swagger）

## 📝 常见问题

### Q: 为什么不直接用 fetch？

A: 
- 统一的错误处理
- 自动 Token 注入
- 拦截器机制
- 更好的类型推导
- 代码复用

### Q: 如何调试请求？

A: 开发环境下会自动打印请求日志，也可以手动查看浏览器 Network 面板。

### Q: 如何处理文件上传？

A: 当前版本主要针对 JSON API，文件上传可以后续扩展 `httpClient` 或使用原生 fetch。

### Q: 如何添加全局请求头？

A: 在 `core/interceptors.ts` 的请求拦截器中添加。

---

**最后更新**: 2026-03-30  
**维护者**: Development Team
