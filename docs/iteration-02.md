# 迭代 2：分类管理 API + 后台页面

> **所属阶段**：第一阶段 — 商品模块
> **预估时间**：2-3 天
> **难度**：入门
> **前置依赖**：迭代 1

## 目标

实现商品分类的完整 CRUD 闭环

## 交付物

- `app/api/categories/route.ts`：GET（树形结构查询）、POST（新增分类）
- `app/api/categories/[id]/route.ts`：PUT（编辑）、DELETE（删除，需校验关联）
- `app/admin/categories/page.tsx`：分类管理页面（树形表格展示、新增/编辑弹窗、删除确认）
- 更新 `app/admin/layout.tsx`：侧边栏添加"分类管理"菜单项

## 核心学习点

- 树形数据的递归构建（扁平数据 -> 树形结构）
- Ant Design Tree / TreeSelect 组件使用
- RESTful API 设计规范
- 删除前的关联校验逻辑

## 验证方式

后台可完整操作分类的增删改查，树形结构正确展示
