# 迭代 12：通知系统

> **所属阶段**：第四阶段 — 支付与通知
> **预估时间**：2-3 天
> **难度**：基础
> **前置依赖**：迭代 11

## 目标

实现站内消息和邮件通知

## 交付物

- notifications 表
- `lib/notification.ts`：通知服务（创建通知、标记已读）
- `app/api/notifications/route.ts`：GET（通知列表）、PATCH（标记已读）
- 订单状态变更时自动创建通知
- 后台顶部栏添加通知铃铛（Badge + Dropdown 展示未读通知）
- 可选：`lib/mailer.ts` + nodemailer 发送邮件通知

## 核心学习点

- 事件驱动思维（订单状态变更 -> 触发通知）
- 消息状态管理（未读/已读）
- Ant Design Badge + Popover 组件组合
- nodemailer 邮件发送基础（可选）

## 验证方式

订单状态变更后出现站内通知，铃铛显示未读数量，可标记已读
