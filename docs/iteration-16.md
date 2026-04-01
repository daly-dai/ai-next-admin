# 迭代 16：Docker 容器化 + CI/CD

> **所属阶段**：第六阶段 — 工程化与部署
> **预估时间**：2-3 天
> **难度**：进阶
> **前置依赖**：迭代 15

## 目标

将项目推向生产就绪状态

## 交付物

- `Dockerfile`：多阶段构建（builder -> runner）
- `docker-compose.yml`：应用 + MySQL 编排
- `.github/workflows/ci.yml`：GitHub Actions 流水线（lint -> build）
- `migrations/` 目录：版本化 SQL 迁移脚本（替代 init-db 的一次性建表）
- 环境变量管理：`.env.development` / `.env.production` 配置隔离
- 更新 `next.config.ts`：生产环境优化配置

## 核心学习点

- Docker 多阶段构建优化镜像体积
- docker-compose 编排多服务
- GitHub Actions CI/CD 基础
- 数据库迁移的版本化管理思想
- 环境隔离的最佳实践

## 验证方式

`docker-compose up` 一键启动完整应用，GitHub Actions 自动运行 lint 和 build
