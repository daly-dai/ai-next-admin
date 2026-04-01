# 迭代 9：RBAC 权限系统

> **所属阶段**：第三阶段 — 权限与安全
> **预估时间**：3-4 天
> **难度**：中等
> **前置依赖**：迭代 8

## 目标

从简单的 role 字段升级为完整的 RBAC 模型

## 交付物

- roles / permissions / role_permissions / user_roles 表
- `lib/rbac.ts`：权限检查工具函数
- `app/api/roles/route.ts`：角色 CRUD
- `app/api/permissions/route.ts`：权限列表
- `app/admin/roles/page.tsx`：角色管理页面（角色列表 + 分配权限）
- 改造现有 API：将 `checkRole` 替换为 RBAC 权限校验
- 改造 `app/admin/layout.tsx`：根据权限动态生成菜单

## 核心学习点

- RBAC 模型设计（用户-角色-权限三层）
- 多对多关系的数据库设计与查询
- 动态菜单渲染
- 权限中间件的通用设计

## 验证方式

不同角色登录后看到不同菜单，无权限的 API 调用被拒绝
