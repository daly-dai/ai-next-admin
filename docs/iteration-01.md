# 迭代 1：数据库建模与基础设施搭建

> **所属阶段**：第一阶段 — 商品模块
> **预估时间**：1-2 天
> **难度**：入门
> **前置依赖**：无

## 目标

设计电商核心数据模型，搭建 API 基础工具

## 交付物

- 商品相关表结构（categories, products, product_images, product_skus）
- 更新 `lib/init-db.ts` 的建表脚本，包含示例数据
- 新建 `lib/api-utils.ts`：统一响应函数（successResponse / errorResponse / paginatedResponse）
- 安装 zod 依赖，新建 `lib/validators.ts`：商品和分类的 Zod 校验 Schema

## 核心学习点

- MySQL 表设计：外键关联、索引策略、树形结构（parent_id 自关联）
- Zod Schema 定义与复用
- 工具函数抽象思维

## 验证方式

运行 `pnpm db:init` 成功建表并插入示例数据
