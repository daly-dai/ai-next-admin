# Next.js + MySQL 后台管理系统

这是一个基于 Next.js 16 和 MySQL 构建的现代化后台管理系统，适合学习实战。

## 🎯 技术栈

- **前端框架**: Next.js 16 (App Router)
- **UI 组件库**: Ant Design 6.x
- **数据库**: MySQL
- **认证**: JWT (JSON Web Token)
- **密码加密**: bcryptjs
- **开发语言**: TypeScript

## ✨ 功能特性

### 已实现的功能

1. **用户认证系统**
   - ✅ 登录/登出
   - ✅ JWT Token 认证
   - ✅ 受保护的路由
   - ✅ 权限控制

2. **数据统计看板**
   - ✅ 用户总数统计
   - ✅ 文章总数统计
   - ✅ 总浏览量统计
   - ✅ 最近注册用户列表
   - ✅ 热门文章列表

3. **用户管理**
   - ✅ 用户列表展示
   - ✅ 分页查询
   - ✅ 添加用户
   - ⏸️ 编辑用户（待实现）
   - ⏸️ 删除用户（待实现）

4. **文章管理**
   - ✅ 文章列表展示（静态数据演示）
   - ⏸️ 文章 CRUD（待扩展）

5. **系统设置**
   - ✅ 基本设置页面
   - ✅ 数据库配置信息展示

## 🚀 快速开始

### 1. 环境要求

- Node.js 18+ 
- MySQL 5.7+ 或 MySQL 8.0+
- pnpm 或 npm

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置数据库

#### 3.1 创建数据库

在 MySQL 中执行：

```sql
CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 3.2 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，修改数据库配置：

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root          # 你的 MySQL 用户名
DATABASE_PASSWORD=your_password  # 你的 MySQL 密码
DATABASE_NAME=admin_db

JWT_SECRET=your_jwt_secret_key_change_this_in_production

NEXT_PUBLIC_APP_NAME=后台管理系统
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. 初始化数据库

运行初始化脚本，会自动创建表结构和测试数据：

```bash
pnpm db:init
```

成功后会看到：

```
✅ 数据库初始化完成！
📝 测试账户信息：
   管理员：username: admin, password: admin123
   普通用户：username: test, password: admin123
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
nextjs-app/
├── app/
│   ├── api/              # API 路由
│   │   ├── auth/         # 认证相关 API
│   │   ├── users/        # 用户相关 API
│   │   └── stats/        # 统计相关 API
│   ├── admin/            # 后台管理页面
│   │   ├── login/        # 登录页
│   │   ├── dashboard/    # 数据看板
│   │   ├── users/        # 用户管理
│   │   ├── articles/     # 文章管理
│   │   └── settings/     # 系统设置
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── lib/                  # 工具库
│   ├── db.ts            # 数据库连接
│   ├── auth.ts          # 认证工具
│   └── init-db.ts       # 数据库初始化
├── scripts/             # 脚本文件
│   └── init-db.ts       # 初始化脚本
├── .env.local           # 环境配置（本地）
├── .env.example         # 环境配置示例
└── package.json
```

## 🔑 默认账户

```
管理员账户:
用户名：admin
密码：admin123

普通用户账户:
用户名：test
密码：admin123
```

## 📚 学习要点

通过这个项目，你可以学习到：

1. **Next.js App Router** - 新一代路由系统
2. **服务端组件与客户端组件** - React Server Components
3. **API Routes** - 构建 RESTful API
4. **MySQL 数据库操作** - 使用 mysql2 进行数据库操作
5. **JWT 认证** - 实现用户认证系统
6. **Ant Design** - 企业级 UI 组件库
7. **TypeScript** - 类型安全的 JavaScript
8. **响应式布局** - 适配不同屏幕尺寸

## 🛠️ 可扩展功能

你可以尝试扩展以下功能来深入学习：

- [ ] 完善文章的 CRUD 操作
- [ ] 添加角色权限管理
- [ ] 实现文件上传功能
- [ ] 添加数据导出功能
- [ ] 集成图表库（如 ECharts）
- [ ] 实现搜索和筛选功能
- [ ] 添加消息通知功能
- [ ] 实现操作日志记录

## 📝 常见问题

### Q: 数据库连接失败？

A: 检查以下几点：
1. MySQL 服务是否启动
2. `.env.local` 中的数据库配置是否正确
3. 数据库 `admin_db` 是否已创建
4. 用户名和密码是否正确

### Q: 如何重置数据库？

A: 删除数据库后重新运行初始化脚本：

```sql
DROP DATABASE IF EXISTS admin_db;
CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然后运行：

```bash
pnpm db:init
```

### Q: 如何在生产环境部署？

A: 
1. 修改 `.env.local` 中的配置为生产环境配置
2. 更改 `JWT_SECRET` 为强随机字符串
3. 运行 `pnpm build` 构建生产版本
4. 运行 `pnpm start` 启动生产服务器
5. 考虑使用 PM2 等进程管理器

## 📄 License

MIT

---

💡 **提示**: 这是一个学习项目，代码结构简单清晰，适合学习和修改。欢迎在此基础上进行扩展和实践！
