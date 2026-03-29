import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken, hashPassword } from '@/lib/auth';

// 创建用户
export async function POST(request: NextRequest) {
  try {
    // 验证 token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '未认证' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, message: '令牌无效' },
        { status: 401 }
      );
    }

    // 检查权限
    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: '无权限' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { username, email, password, role = 'user' } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: '必填字段不能为空' },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在
    const existingUsers = await query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    ) as any[];

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, message: '用户名已存在' },
        { status: 400 }
      );
    }

    // 加密密码
    const passwordHash = await hashPassword(password);

    // 插入用户
    const result = await query(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, role]
    );

    return NextResponse.json({
      success: true,
      message: '用户创建成功',
      data: {
        id: (result as any).insertId,
        username,
        email,
        role,
      },
    });
  } catch (error) {
    console.error('创建用户失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
