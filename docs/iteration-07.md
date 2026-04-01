# 迭代 7：收货地址 + 下单流程

> **所属阶段**：第二阶段 — 购物车与订单
> **预估时间**：3-4 天
> **难度**：中等
> **前置依赖**：迭代 6

## 目标

实现从购物车到创建订单的完整链路

## 交付物

- addresses 表 + `app/api/addresses/route.ts`：地址 CRUD + 设置默认
- orders / order_items 表
- `app/api/orders/route.ts`：POST（创建订单，含库存扣减事务）、GET（订单列表）
- `app/api/orders/[id]/route.ts`：GET（订单详情）
- `app/(store)/checkout/page.tsx`：结算页（选择地址 + 确认商品 + 提交订单）
- `app/(store)/orders/page.tsx`：我的订单列表
- `app/(store)/orders/[id]/page.tsx`：订单详情

## 核心学习点

- MySQL 事务的实战运用（库存扣减 + 订单创建原子操作）
- 乐观锁处理并发扣减（`UPDATE stock SET stock = stock - ? WHERE stock >= ?`）
- 订单号生成策略
- 复杂的多表关联查询

## 验证方式

完整走通"加入购物车 -> 结算 -> 创建订单 -> 查看订单"流程
