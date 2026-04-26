# 数据库约定

## 连接

- 连接池：`lib/db.ts` → `getPool()` 返回 mysql2 Pool 单例
- 查询：`query(sql, params)` 执行参数化查询，自动获取和释放连接
- 配置：`.env.local` 中的 `DATABASE_*` 环境变量

```ts
import { query } from '@/lib/db';
const users = await query('SELECT * FROM users WHERE status = ?', [1]);
```

## 表设计

### 命名

- 表名：小写复数（`users`, `articles`, `products`）
- 列名：snake_case（`created_at`, `updated_at`, `author_id`）
- 主键：`id INT AUTO_INCREMENT PRIMARY KEY`
- 外键：`{entity}_id`

### 标准列

```sql
CREATE TABLE IF NOT EXISTS {table} (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- 业务列 --
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 字段类型映射

| 业务含义 | SQL 类型 |
|:--|:--|
| 主键 | `INT AUTO_INCREMENT PRIMARY KEY` |
| 短文本 | `VARCHAR(N)` |
| 长文本 | `TEXT` |
| 布尔/状态 | `TINYINT DEFAULT 1` |
| 外键 | `INT NOT NULL` |
| 时间 | `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` |
| 金额 | `DECIMAL(10,2)` |
| 枚举 | `VARCHAR(20)` |

## SQL 编写规则

### 参数化（最高优先级）

```ts
// ✅ 参数化
query('UPDATE users SET status = ? WHERE id = ?', [status, id])

// ❌ 字符串拼接 → SQL 注入
query(`UPDATE users SET status = ${status} WHERE id = ${id}`)
```

### 动态查询

```ts
const conditions: string[] = [];
const values: any[] = [];

if (username) {
  conditions.push('username LIKE ?');
  values.push(`%${username}%`);
}
if (role) {
  conditions.push('role = ?');
  values.push(role);
}

const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
const total = (await query(`SELECT COUNT(*) as count FROM ${table} ${where}`, values)) as any[];
const rows = await query(
  `SELECT * FROM ${table} ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
  [...values, pageSize, offset]
);
```

### 动态排序白名单

```ts
const ALLOWED_SORT = ['id', 'created_at', 'username'];
const sortField = ALLOWED_SORT.includes(reqSort) ? reqSort : 'id';
```

## Migration

### DbModule 接口

```ts
// lib/db-modules/types.ts
export interface DbModule {
  name: string;
  createTables: (pool: Pool) => Promise<void>;
  seed: (pool: Pool) => Promise<void>;
}
```

### 新增模块步骤

1. 新建 `lib/db-modules/{module}.ts`，实现 DbModule
2. 在 `lib/db-modules/index.ts` 的 modules 数组注册
3. 运行 `pnpm db:init`

### 种子数据

- 必须幂等（`INSERT ... ON DUPLICATE KEY UPDATE`）
- 默认管理员在 user 模块 seed 中创建

## 禁止模式

| 禁止 | 正确 |
|:--|:--|
| 字符串拼接 SQL | `query(sql, [params])` |
| `SELECT *`（含敏感列） | 排除 password_hash 等列 |
| 列表查询无 LIMIT | 必须分页 |
| 代码中硬编码连接信息 | 从 `process.env` 读取 |
