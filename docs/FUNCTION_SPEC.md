# Next.js 全栈电商平台 — 功能规格文档

> 版本：v1.0 | 2026-04-26 | 基于迭代路线 docs/ 目录下 16 个迭代规划整合

---

## 1. 项目身份

| 属性 | 说明 |
|------|------|
| 项目名称 | nextjs-app |
| 项目定位 | Next.js 全栈电商后台管理系统 + 前台商城 |
| 核心目标 | AI 架构落地产物，覆盖全栈开发核心模式（CRUD / 认证 / 权限 / 支付 / 搜索 / 部署） |
| 用户群体 | 后台管理员 + 前台普通用户（C 端） |

---

## 2. 架构总览

```
nextjs-app/
├── app/                          # Next.js App Router 页面 + API
│   ├── admin/                    # 后台管理（需认证）
│   │   ├── login/                #   登录
│   │   ├── register/             #   注册
│   │   ├── forgot-password/      #   忘记密码
│   │   ├── dashboard/            #   数据看板
│   │   ├── users/                #   用户管理
│   │   ├── articles/             #   文章管理（demo）
│   │   ├── categories/           #   分类管理（迭代2）
│   │   ├── products/             #   商品管理（迭代4）
│   │   ├── orders/               #   订单管理（迭代8）
│   │   ├── roles/                #   角色管理（迭代9）
│   │   └── settings/             #   系统设置
│   ├── (store)/                  # 前台商城路由组（迭代4+）
│   │   ├── page.tsx              #   商城首页
│   │   ├── products/             #   商品列表/详情
│   │   ├── cart/                 #   购物车（迭代6）
│   │   ├── checkout/             #   结算（迭代7）
│   │   ├── orders/               #   我的订单（迭代7）
│   │   ├── payment/              #   支付（迭代11）
│   │   ├── search/               #   搜索（迭代13）
│   │   ├── login/                #   前台登录（迭代5）
│   │   └── register/             #   前台注册（迭代5）
│   └── api/                      # API Routes
│       ├── auth/                 #   认证
│       ├── users/                #   用户 CRUD
│       ├── categories/           #   分类 CRUD（迭代2）
│       ├── products/             #   商品 CRUD（迭代3）
│       ├── upload/               #   文件上传（迭代3）
│       ├── cart/                 #   购物车（迭代6）
│       ├── addresses/            #   收货地址（迭代7）
│       ├── orders/               #   订单（迭代7-8）
│       ├── roles/                #   角色（迭代9）
│       ├── permissions/          #   权限（迭代9）
│       ├── payments/             #   支付（迭代11）
│       ├── webhooks/             #   支付回调（迭代11）
│       ├── notifications/        #   通知（迭代12）
│       ├── search/               #   搜索（迭代13）
│       └── stats/                #   统计
├── lib/                          # 核心库
│   ├── db.ts                     #   MySQL 连接池
│   ├── db-modules/               #   数据库模块化封装
│   ├── services/                 #   HTTP 客户端层（拦截器/类型/模块化 API）
│   ├── auth.ts                   #   JWT + bcrypt 认证
│   ├── api-utils.ts              #   统一 API 响应格式
│   ├── validators.ts             #   Zod 校验 Schema
│   ├── middleware.ts             #   认证中间件
│   ├── init-db.ts                #   数据库初始化
│   ├── order-state-machine.ts    #   订单状态机（迭代8）
│   ├── rbac.ts                   #   RBAC 权限（迭代9）
│   ├── payment.ts                #   支付网关（迭代11）
│   ├── notification.ts           #   通知服务（迭代12）
│   ├── cache.ts                  #   缓存工具（迭代13）
│   ├── logger.ts                 #   日志（迭代15）
│   ├── rate-limit.ts             #   限流（迭代15）
│   └── constants.ts              #   常量
├── .ai/                          # AI 辅助开发体系
│   ├── AGENTS.md                 #   AI 协作入口
│   ├── project-brief.md          #   认知速览
│   ├── modes/                    #   5 阶段工作流
│   ├── templates/                #   代码模板
│   ├── conventions/              #   开发规范
│   ├── pitfalls/                 #   错题集
│   └── tools/                    #   自动化工具链
├── docs/                         # 项目文档
│   ├── iteration-01 ~ 16.md      #   迭代规划
│   └── FUNCTION_SPEC.md          #   本文件
├── scripts/                      # 脚本
└── public/                       # 静态资源
```

---

## 3. 功能清单

### 3.1 已完成 ✅

| 模块 | 功能 | 涉及文件 | 状态 |
|------|------|---------|------|
| 认证 | 登录/登出 | `admin/login`, `api/auth/login` | ✅ |
| 认证 | JWT Token 签发与验证 | `lib/auth.ts` | ✅ |
| 认证 | bcrypt 密码加密 | `lib/auth.ts` | ✅ |
| 认证 | 受保护路由拦截 | `lib/middleware.ts`, `admin/layout.tsx` | ✅ |
| 认证 | 获取当前用户信息 | `api/auth/me` | ✅ |
| 认证 | 注册页面 | `admin/register` | ✅ |
| 认证 | 忘记密码页面 | `admin/forgot-password` | ✅ |
| 用户管理 | 用户列表 + 分页 | `admin/users`, `api/users` | ✅ |
| 用户管理 | 添加用户（表单 + 唯一性校验） | `admin/users`, `api/users/create` | ✅ |
| 用户管理 | 搜索筛选（用户名/邮箱/角色/状态） | `admin/users`, `api/users` | ✅ |
| 数据看板 | 统计卡片（用户数/文章数/浏览量） | `admin/dashboard`, `api/stats` | ✅ |
| 数据看板 | 最近注册用户 + 热门文章列表 | `admin/dashboard` | ✅ |
| 文章管理 | 静态 demo 展示 | `admin/articles` | ✅ |
| 系统设置 | 设置表单 + 系统状态展示 | `admin/settings` | ✅ |
| 基础设施 | MySQL 连接池 | `lib/db.ts` | ✅ |
| 基础设施 | 数据库初始化 + 种子数据 | `lib/init-db.ts`, `scripts/init-db.ts` | ✅ |
| 基础设施 | 统一 API 响应格式 | `lib/api-utils.ts` | ✅ |
| 基础设施 | Zod 数据校验 | `lib/validators.ts` | ✅ |
| 基础设施 | HTTP 客户端封装（拦截器/类型安全） | `lib/services/` | ✅ |
| 基础设施 | 后台管理布局（侧边栏/顶栏/折叠） | `admin/layout.tsx` | ✅ |
| 基础设施 | Ant Design + Tailwind CSS 集成 | `AntdRegistry.tsx` | ✅ |

### 3.2 规划中 📋

#### 第一阶段：商品模块（迭代 1-4）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 1 | 数据库建模 | categories / products / product_images / product_skus 表 + Zod Schema | 1-2天 |
| 2 | 分类管理 | 分类 CRUD API + 树形表格后台页面 | 2-3天 |
| 3 | 商品 API + 上传 | 商品 CRUD（事务/分页/JOIN）+ 图片上传 | 3-4天 |
| 4 | 商品页面 + 前台 | 后台商品管理 + 前台 (store) 路由组：首页/列表/详情 | 3-4天 |

#### 第二阶段：购物车与订单（迭代 5-8）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 5 | 前台注册登录 | 前台独立认证体系（注册/登录/表单校验） | 1-2天 |
| 6 | 购物车 | cart 表 + 购物车 CRUD API + 前端页面 + 数量同步 | 2-3天 |
| 7 | 地址 + 下单 | addresses 表 + 地址 CRUD + 订单创建（库存扣减事务） | 3-4天 |
| 8 | 订单状态管理 | 状态机（待支付→已支付→已发货→已完成/已取消）+ 后台管理 + 超时取消 | 2-3天 |

#### 第三阶段：权限与安全（迭代 9-10）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 9 | RBAC 权限 | roles/permissions 表 + 角色管理 + 动态菜单 + API 权限校验 | 3-4天 |
| 10 | 认证安全升级 | HttpOnly Cookie + Refresh Token + Next.js Middleware 统一拦截 | 2-3天 |

#### 第四阶段：支付与通知（迭代 11-12）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 11 | 模拟支付 | 支付网关 + 创建支付单 + Webhook 回调 + 幂等处理 | 2-3天 |
| 12 | 通知系统 | 站内通知 + 铃铛 Badge + 邮件通知（nodemailer） | 2-3天 |

#### 第五阶段：搜索与性能（迭代 13-14）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 13 | 搜索 + 缓存 | MySQL FULLTEXT 搜索 + 联想词 + 防抖 + 缓存策略 | 2-3天 |
| 14 | 看板升级 + 性能 | 图表可视化（ECharts）+ Suspense 流式渲染 + loading.tsx | 2-3天 |

#### 第六阶段：工程化与部署（迭代 15-16）

| 迭代 | 功能 | 核心交付 | 预估 |
|------|------|---------|------|
| 15 | 日志 + 安全 | 结构化日志 + error.tsx 边界 + 限流 + Security Headers | 2-3天 |
| 16 | Docker + CI/CD | Dockerfile 多阶段构建 + docker-compose + GitHub Actions | 2-3天 |

---

## 4. 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Next.js | 16.x | App Router |
| UI 库 | React | 18.x | |
| 语言 | TypeScript | 5.x | 严格模式 |
| UI 组件 | Ant Design | 5.x | 企业级组件库 |
| AI 组件增强 | @dalydb/sdesign | 1.6.x | SSearchTable / SForm / SButton / SDetail |
| 样式 | Tailwind CSS | 4.x | + antd Token 集成 |
| 数据库 | MySQL | - | + mysql2 驱动 |
| 认证 | JWT | jsonwebtoken 9.x | Access + Refresh Token |
| 密码 | bcryptjs | 3.x | |
| 校验 | Zod | 4.x | |
| HTTP 客户端 | Axios | - | 封装在 lib/services/core/ |
| Hooks | ahooks | 3.x | useRequest 等 |
| 图表 | ECharts / Recharts | - | 迭代 14 引入 |
| 邮件 | Nodemailer | - | 迭代 12 引入 |
| 部署 | Docker + GitHub Actions | - | 迭代 16 引入 |

---

## 5. 数据库设计

### 5.1 已完成

```sql
-- 用户表
users (id, username, email, password_hash, role, status, created_at, updated_at)

-- 文章表
articles (id, title, content, author_id FK→users, status, views, created_at, updated_at)
```

### 5.2 规划中

```
categories        (id, name, slug, parent_id, sort_order, created_at)
products          (id, title, description, category_id FK, price, stock, status, created_at, updated_at)
product_images    (id, product_id FK, url, sort_order)
product_skus      (id, product_id FK, name, price, stock)
cart              (id, user_id FK, product_id FK, sku_id FK, quantity)
addresses         (id, user_id FK, name, phone, province, city, district, detail, is_default)
orders            (id, order_no, user_id FK, address_id FK, total_amount, status, created_at, updated_at)
order_items       (id, order_id FK, product_id FK, sku_id FK, quantity, price)
payments          (id, order_id FK, amount, method, status, transaction_id, created_at)
roles             (id, name, description)
permissions       (id, name, resource, action)
role_permissions  (role_id FK, permission_id FK)
user_roles        (user_id FK, role_id FK)
notifications     (id, user_id FK, title, content, is_read, created_at)
```

---

## 6. API 设计规范

### 6.1 已完成

| 端点 | 方法 | 说明 | 认证 |
|------|------|------|------|
| `/api/auth/login` | POST | 用户登录 | 否 |
| `/api/auth/me` | GET | 当前用户信息 | 是 |
| `/api/users` | GET | 用户列表（分页+搜索） | 是 |
| `/api/users/create` | POST | 创建用户 | 是(admin) |
| `/api/stats` | GET | 统计数据 | 是 |

### 6.2 规划中（核心 API）

| 端点 | 方法 | 说明 | 迭代 |
|------|------|------|------|
| `/api/categories` | GET/POST | 分类列表(树形)/新增 | 2 |
| `/api/categories/[id]` | PUT/DELETE | 编辑/删除分类 | 2 |
| `/api/products` | GET/POST | 商品列表(分页+筛选)/新增(事务) | 3 |
| `/api/products/[id]` | GET/PUT/DELETE | 商品详情/编辑/删除 | 3 |
| `/api/products/[id]/status` | PATCH | 上下架 | 3 |
| `/api/upload` | POST | 图片上传 | 3 |
| `/api/auth/register` | POST | 前台注册 | 5 |
| `/api/cart` | GET/POST/PUT/DELETE | 购物车 CRUD | 6 |
| `/api/addresses` | GET/POST | 地址 CRUD | 7 |
| `/api/orders` | POST/GET | 创建订单/订单列表 | 7 |
| `/api/orders/[id]/status` | PATCH | 状态流转 | 8 |
| `/api/orders/[id]/cancel` | POST | 取消+库存回滚 | 8 |
| `/api/roles` | GET/POST | 角色管理 | 9 |
| `/api/permissions` | GET | 权限列表 | 9 |
| `/api/payments/create` | POST | 创建支付单 | 11 |
| `/api/webhooks/payment` | POST | 支付回调 | 11 |
| `/api/notifications` | GET/PATCH | 通知列表/标记已读 | 12 |
| `/api/search` | GET | 商品搜索(全文索引) | 13 |
| `/api/search/suggestions` | GET | 搜索联想 | 13 |
| `/api/auth/refresh` | POST | Token 刷新 | 10 |
| `/api/auth/logout` | POST | 登出 | 10 |

### 6.3 统一响应格式

```typescript
// 成功
{ code: 200, data: T, message: "ok" }

// 分页
{ code: 200, data: { list: T[], total: number, page: number, pageSize: number }, message: "ok" }

// 错误
{ code: number, data: null, message: string }
```

---

## 7. AI 辅助开发体系

项目内置 `.ai/` 目录，定义了完整的 AI 协作工作流：

| 阶段 | 触发信号 | 用途 |
|------|---------|------|
| ① 画 Demo | PRD + 画页面 | 生成 Demo 页面 + 占位 API |
| ② 接口合并 | Swagger/接口文档 | 合并真实接口定义 |
| ③ 改造适配 | feature-spec + 改造 | 按规格改造已有页面 |
| ④ 接口对接 | 联调/替换 mock | 占位 URL → 真实 URL |
| ⑤ 迭代修复 | 改/加字段/修 bug | 最小范围修改 |

辅助工具链：
- `pnpm verify` — tsc + eslint + prettier 自动化验证
- `pnpm task:prompt` — 跨会话任务衔接
- `pnpm pitfall:scan` — 高频错误聚合
- `pnpm verify:scope` — 跨模块修改告警

---

## 8. 认证与权限模型

### 当前（已实现）
```
JWT Token (localStorage) → checkAuth() → 路由保护
role 字段: admin / user
```

### 目标（迭代 9-10）
```
HttpOnly Cookie (Access 15min + Refresh 7d)
  → Next.js Middleware 统一拦截
    → RBAC: 用户 → 角色 → 权限 → 资源
```

---

## 9. 部署目标

| 阶段 | 方式 |
|------|------|
| 开发 | `pnpm dev` (localhost:3000) |
| 生产 | `pnpm build` + `pnpm start` |
| 容器化 | `docker-compose up`（应用 + MySQL） |
| CI/CD | GitHub Actions: lint → type-check → build |

---

## 10. 开发节奏

| 阶段 | 迭代 | 累计预估 | 产出 |
|------|------|---------|------|
| 一：商品模块 | 1-4 | ~10天 | 后台商品管理 + 前台商城壳 |
| 二：购物车订单 | 5-8 | ~10天 | 完整下单链路 |
| 三：权限安全 | 9-10 | ~6天 | RBAC + Refresh Token |
| 四：支付通知 | 11-12 | ~5天 | 支付 + 通知闭环 |
| 五：搜索性能 | 13-14 | ~5天 | 搜索 + 图表 + 优化 |
| 六：工程化 | 15-16 | ~5天 | Docker + CI/CD |

总预估：5-8 周（每天 2-3 小时）

---

*最后更新：2026-04-26*
