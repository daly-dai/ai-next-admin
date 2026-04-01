# 迭代 10：认证安全升级

> **所属阶段**：第三阶段 — 权限与安全
> **预估时间**：2-3 天
> **难度**：中等
> **前置依赖**：迭代 5（可在迭代 5 之后任意时间做）

## 目标

提升认证体系的安全性

## 交付物

- 改造认证为 HttpOnly Cookie 方案（替代 localStorage）
- 实现 Refresh Token 机制（Access Token 15min + Refresh Token 7days）
- `app/api/auth/refresh/route.ts`：Token 刷新接口
- `app/api/auth/logout/route.ts`：登出（清除 Cookie）
- Next.js Middleware (`middleware.ts`)：路由级别统一拦截（替代 layout 中的认证检查）
- 前端 fetch 封装：自动 refresh 过期 Token

## 核心学习点

- HttpOnly Cookie 的安全优势（防 XSS）
- Access Token + Refresh Token 的双 Token 方案
- Next.js Middleware 的工作原理和使用场景
- 前端请求拦截器的设计

## 验证方式

Cookie 在浏览器 DevTools 中不可通过 JS 读取，Token 过期后自动刷新，登出后 Cookie 被清除
