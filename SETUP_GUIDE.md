# 🚀 Next.js 后台管理系统 - 快速启动脚本

## Windows PowerShell 快速配置

### 方法 1: 使用自动化脚本（推荐）

在项目根目录创建 `setup.ps1` 文件，内容如下：

```powershell
# 设置控制台颜色
$Host.UI.RawUI.WindowTitle = "Next.js Admin Panel Setup"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Next.js 后台管理系统 - 自动配置脚本" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 检查 Node.js
Write-Host "[1/5] 检查 Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js 已安装：$nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ 未检测到 Node.js，请先安装 Node.js (https://nodejs.org/)" -ForegroundColor Red
    exit 1
}

# 检查 pnpm
Write-Host "`n[2/5] 检查 pnpm..." -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $pnpmVersion = pnpm --version
    Write-Host "✓ pnpm 已安装：v$pnpmVersion" -ForegroundColor Green
} else {
    Write-Host "⚠ pnpm 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g pnpm
}

# 安装依赖
Write-Host "`n[3/5] 安装项目依赖..." -ForegroundColor Yellow
pnpm install

# 检查 MySQL
Write-Host "`n[4/5] 检查 MySQL 连接..." -ForegroundColor Yellow
Write-Host "请确保:" -ForegroundColor Cyan
Write-Host "  1. MySQL 服务已启动" -ForegroundColor White
Write-Host "  2. 已创建数据库 admin_db" -ForegroundColor White
Write-Host "  3. 知道 MySQL 的 root 密码" -ForegroundColor White

$continue = Read-Host "`n是否继续配置数据库？(y/n)"
if ($continue -ne 'y') {
    Write-Host "`n✗ 配置已取消" -ForegroundColor Red
    exit 0
}

# 配置环境变量
Write-Host "`n[5/5] 配置环境变量..." -ForegroundColor Yellow

if (Test-Path ".env.local") {
    Write-Host "✓ .env.local 文件已存在" -ForegroundColor Green
    $edit = Read-Host "是否需要编辑 .env.local 文件？(y/n)"
    if ($edit -eq 'y') {
        notepad .env.local
    }
} else {
    Copy-Item ".env.example" ".env.local"
    Write-Host "✓ 已创建 .env.local 文件" -ForegroundColor Green
    Write-Host "⚠ 请编辑 .env.local 文件，修改数据库配置" -ForegroundColor Yellow
    
    notepad .env.local
    
    Write-Host "`n修改完成后按任意键继续..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# 提示下一步操作
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  ✓ 基础配置完成！" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "接下来请执行以下步骤:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 初始化数据库：" -ForegroundColor White
Write-Host "   pnpm db:init`n" -ForegroundColor Gray

Write-Host "2. 启动开发服务器：" -ForegroundColor White
Write-Host "   pnpm dev`n" -ForegroundColor Gray

Write-Host "3. 访问系统：" -ForegroundColor White
Write-Host "   http://localhost:3000`n" -ForegroundColor Gray

Write-Host "默认账户:" -ForegroundColor White
Write-Host "   用户名：admin" -ForegroundColor Gray
Write-Host "   密码：admin123`n" -ForegroundColor Gray

Write-Host "详细说明请查看：使用指南.md`n" -ForegroundColor Cyan
```

**使用方法**:

右键点击 `setup.ps1` 文件，选择 **"使用 PowerShell 运行"**

或者在命令行执行：

```powershell
.\setup.ps1
```

---

### 方法 2: 手动逐步配置

如果不想使用自动化脚本，可以手动执行以下步骤：

#### 步骤 1: 安装依赖

```bash
pnpm install
```

#### 步骤 2: 创建数据库

打开 MySQL 命令行或工具（如 Navicat、MySQL Workbench）：

```sql
CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 步骤 3: 配置环境变量

复制配置文件：

```bash
copy .env.example .env.local
```

用记事本打开 `.env.local`：

```bash
notepad .env.local
```

修改以下内容：

```env
DATABASE_USER=root              # 你的 MySQL 用户名
DATABASE_PASSWORD=你的密码      # 你的 MySQL 密码（必须修改）
DATABASE_NAME=admin_db
```

保存并关闭。

#### 步骤 4: 初始化数据库

```bash
pnpm db:init
```

#### 步骤 5: 启动开发服务器

```bash
pnpm dev
```

看到以下信息表示成功：

```
  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
  - Ready in xxxms
```

#### 步骤 6: 访问系统

打开浏览器访问：[http://localhost:3000](http://localhost:3000)

或直接访问登录页：[http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📋 配置检查清单

在开始之前，请确认以下条件都满足：

- [ ] 已安装 Node.js 18+ （检查：`node --version`）
- [ ] 已安装 pnpm（检查：`pnpm --version`）
- [ ] MySQL 服务已启动
- [ ] 已创建数据库 `admin_db`
- [ ] 知道 MySQL 的用户名和密码
- [ ] 已修改 `.env.local` 中的数据库密码

---

## 🔍 故障排查

### 检查 MySQL 服务状态

```powershell
# Windows
net start | findstr MySQL
```

如果没有输出，说明 MySQL 服务未启动，需要启动服务：

```powershell
net start MySQL80  # 服务名可能是 MySQL57, MySQL 等
```

### 测试数据库连接

创建一个简单的测试文件 `test-db.js`：

```javascript
const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'your_password',
      database: 'admin_db'
    });
    
    console.log('✅ 数据库连接成功！');
    await connection.end();
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
  }
}

test();
```

运行测试：

```bash
node test-db.js
```

---

## 💡 提示

1. **密码安全**: 
   - 开发环境可以使用简单密码
   - 生产环境务必使用强密码
   - 不要将 `.env.local` 提交到 Git

2. **端口占用**:
   - 如果 3000 端口被占用，可以使用其他端口：
   ```bash
   pnpm dev --port 3001
   ```

3. **重置数据库**:
   ```sql
   DROP DATABASE IF EXISTS admin_db;
   CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
   然后重新运行：`pnpm db:init`

4. **查看详细日志**:
   ```bash
   # 开发模式会自动显示详细日志
   pnpm dev
   ```

---

祝你配置顺利！🎉

如有问题，请查看 `使用指南.md` 获取更多帮助。
