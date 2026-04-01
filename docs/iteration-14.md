# 迭代 14：数据看板升级 + 前端性能优化

> **所属阶段**：第五阶段 — 搜索与性能
> **预估时间**：2-3 天
> **难度**：进阶
> **前置依赖**：迭代 13

## 目标

提升数据可视化和页面加载体验

## 交付物

- 升级 `app/admin/dashboard/page.tsx`：销售趋势图、商品销量排行、用户增长曲线（使用 echarts/recharts）
- `app/api/stats/route.ts` 扩展：按日期范围查询统计数据
- 各页面添加 `loading.tsx` 骨架屏
- 使用 React Suspense + 流式渲染优化首屏加载
- Next.js `<Image>` 组件替换所有 `<img>` 标签

## 核心学习点

- 数据可视化库的使用（echarts 或 recharts）
- SQL 聚合查询（GROUP BY 日期、SUM、COUNT）
- React Suspense 和 Streaming SSR 原理
- Next.js Image 组件的优化原理（懒加载、WebP、尺寸优化）

## 验证方式

看板展示图表、骨架屏在加载时正确显示、图片使用 Next.js Image 优化
