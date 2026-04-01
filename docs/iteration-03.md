# 迭代 3：商品 CRUD API + 文件上传

> **所属阶段**：第一阶段 — 商品模块
> **预估时间**：3-4 天
> **难度**：基础
> **前置依赖**：迭代 1, 迭代 2

## 目标

实现商品后端接口和图片上传能力

## 交付物

- `app/api/products/route.ts`：GET（分页 + 筛选 + 排序 + JOIN 分类）、POST（新增，含事务）
- `app/api/products/[id]/route.ts`：GET（详情）、PUT（编辑）、DELETE（删除）
- `app/api/products/[id]/status/route.ts`：PATCH（上下架切换）
- `app/api/upload/route.ts`：图片上传（类型校验、大小限制、按日期存储到 public/uploads/）

## 核心学习点

- MySQL 事务（商品 + 图片 + SKU 一起写入）
- 复杂 SQL 查询（JOIN、动态 WHERE 条件拼接、排序）
- Next.js Route Handler 处理 multipart/form-data
- 文件系统操作（fs/promises）

## 验证方式

用 Postman / curl 测试所有 API 接口正常返回
