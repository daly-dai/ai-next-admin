# 迭代 13：商品搜索 + 缓存优化

> **所属阶段**：第五阶段 — 搜索与性能
> **预估时间**：2-3 天
> **难度**：进阶
> **前置依赖**：迭代 8

## 目标

实现实用的搜索功能和数据缓存

## 交付物

- `app/api/search/route.ts`：搜索 API（MySQL FULLTEXT 全文索引、多条件筛选、排序）
- `app/api/search/suggestions/route.ts`：搜索联想词 API
- `app/(store)/search/page.tsx`：搜索结果页
- 前台导航栏添加搜索框（防抖处理 + 联想下拉）
- `lib/cache.ts`：简易内存缓存工具（分类树、热门商品等高频数据缓存）
- 使用 Next.js `unstable_cache` / `revalidateTag` 对商品页面做缓存

## 核心学习点

- MySQL FULLTEXT 索引的创建和使用
- 防抖（debounce）在搜索场景的应用
- 缓存策略设计（缓存什么、缓存多久、何时失效）
- Next.js 缓存与 ISR 的实战配置

## 验证方式

搜索功能可用，联想词响应快速，缓存命中后查询性能明显提升
