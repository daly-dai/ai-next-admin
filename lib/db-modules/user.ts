import type { DbModule } from './types';

const userModule: DbModule = {
  name: '用户模块',

  async createTables(pool) {
    // 创建用户表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建文章表（用于 CRUD 示例）
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT,
        author_id INT NOT NULL,
        status TINYINT DEFAULT 1,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  },

  async seed(pool) {
    const bcrypt = require('bcryptjs');
    const adminPassword = await bcrypt.hash('admin123', 10);

    // 插入默认管理员账户
    await pool.execute(`
      INSERT INTO users (username, email, password_hash, role) 
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE username=username;
    `, ['admin', 'admin@example.com', adminPassword, 'admin']);

    // 插入测试用户
    await pool.execute(`
      INSERT INTO users (username, email, password_hash, role) 
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE username=username;
    `, ['test', 'test@example.com', adminPassword, 'user']);

    // 插入测试文章
    const [userRows] = await pool.execute('SELECT id FROM users WHERE username = ?', ['admin']);
    const rows = userRows as any[];
    if (rows.length > 0) {
      const adminId = rows[0].id;

      await pool.execute(`
        INSERT INTO articles (title, content, author_id) VALUES
        ('欢迎使用后台管理系统', '这是一个基于 Next.js + MySQL 的后台管理系统示例...', ?),
        ('学习 Next.js App Router', 'App Router 是 Next.js 13+ 的新特性，支持服务端组件...', ?),
        ('MySQL 数据库最佳实践', '在 production 环境中，建议使用连接池来管理数据库连接...', ?)
      `, [adminId, adminId, adminId]);
    }
  },
};

export default userModule;
