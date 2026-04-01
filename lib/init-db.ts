import { getPool, testConnection } from './db';
import { modules } from './db-modules';

async function initDatabase() {
  const pool = getPool();

  try {
    for (const mod of modules) {
      console.log(`  📦 初始化模块: ${mod.name}`);
      await mod.createTables(pool);
      await mod.seed(pool);
      console.log(`  ✅ ${mod.name} 完成`);
    }

    console.log('✅ 数据库初始化完成！');
    console.log('📝 默认管理员账户：username: admin, password: admin123');
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  }
}

// 如果是直接运行此文件
if (require.main === module) {
  testConnection()
    .then(async (success) => {
      if (success) {
        await initDatabase();
        process.exit(0);
      } else {
        console.log('请先配置数据库连接');
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default initDatabase;
