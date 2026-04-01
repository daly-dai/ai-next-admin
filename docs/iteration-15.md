# 迭代 15：日志、错误处理与安全加固

> **所属阶段**：第六阶段 — 工程化与部署
> **预估时间**：2-3 天
> **难度**：中等
> **前置依赖**：迭代 8（可在迭代 8 之后任意时间做）

## 目标

提升应用的健壮性和安全性

## 交付物

- `lib/logger.ts`：结构化日志（请求日志、错误日志、业务日志，输出到文件）
- 各页面添加 `error.tsx` 错误边界
- `app/not-found.tsx`：全局 404 页面
- `lib/rate-limit.ts`：API 限流（滑动窗口算法，基于 IP）
- 安全 Headers 配置（`next.config.ts` 中添加 security headers）
- SQL 注入防护复查 + XSS 防护

## 核心学习点

- 结构化日志的设计理念
- Next.js 错误边界的层级体系（error.tsx / not-found.tsx / global-error.tsx）
- 限流算法原理（令牌桶 vs 滑动窗口）
- Web 安全基础（OWASP Top 10 常见防护）

## 验证方式

异常请求被记录到日志、超频请求返回 429、错误页面正确展示
