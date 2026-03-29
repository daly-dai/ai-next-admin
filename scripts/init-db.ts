import { testConnection } from '../lib/db';
import initDatabase from '../lib/init-db';

async function main() {
  console.log('🚀 开始初始化数据库...\n');
  
  const connected = await testConnection();
  
  if (!connected) {
    console.error('\n❌ 数据库连接失败！');
    console.log('\n请检查以下配置：');
    console.log('1. 确保 MySQL 服务已启动');
    console.log('2. 检查 .env.local 文件中的数据库配置是否正确');
    console.log('3. 确保数据库已创建（CREATE DATABASE admin_db）');
    process.exit(1);
  }
  
  try {
    await initDatabase();
    console.log('\n✅ 所有初始化完成！\n');
    console.log('📝 测试账户信息：');
    console.log('   管理员：username: admin, password: admin123');
    console.log('   普通用户：username: test, password: admin123\n');
    console.log('🎉 现在可以访问 http://localhost:3000/admin/login 开始使用后台管理系统\n');
  } catch (error) {
    console.error('\n❌ 初始化过程中出错:', error);
    process.exit(1);
  }
}

main();
