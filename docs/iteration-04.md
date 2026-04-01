# 迭代 4：商品管理后台页面 + 前台商品展示

> **所属阶段**：第一阶段 — 商品模块
> **预估时间**：3-4 天
> **难度**：基础
> **前置依赖**：迭代 3

## 目标

完成商品模块的前端闭环

## 交付物

- `app/admin/products/page.tsx`：商品列表（Table + 分页 + 筛选 + 上下架操作）
- 商品新增/编辑表单（Modal 或独立页面，含图片上传、SKU 管理、富文本描述）
- `app/(store)/layout.tsx`：前台商城布局（导航栏 + 底部）
- `app/(store)/page.tsx`：商城首页（分类展示 + 推荐商品）
- `app/(store)/products/page.tsx`：商品列表页（分类筛选 + 分页）
- `app/(store)/products/[id]/page.tsx`：商品详情页（图片轮播 + 规格选择）

## 核心学习点

- Ant Design 复杂表单（动态表单项、图片上传组件）
- Next.js Route Groups —— `(store)` 路由组实现前后台分离布局
- SSR 数据获取（Server Component 直接调用数据库 or fetch API）
- 响应式布局设计

## 验证方式

后台可管理商品，前台可浏览商品列表和详情
