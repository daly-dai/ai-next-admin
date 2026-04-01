import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, User } from '@/lib/auth';

/**
 * 验证请求的认证信息
 * @param request Next.js 请求对象
 * @returns 返回验证结果：成功时包含 user 对象，失败时包含 error 响应
 */
export function authenticateRequest(request: NextRequest): 
  | { success: true; user: User }
  | { success: false; response: NextResponse } {
  
  // 获取 Authorization header
  const authHeader = request.headers.get('authorization');
  
  // 检查 header 是否存在且格式正确
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: '未提供认证令牌' },
        { status: 401 }
      )
    };
  }

  // 提取 token
  const token = authHeader.split(' ')[1];
  
  // 验证 token
  const user = verifyToken(token);
  
  if (!user) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: '令牌无效或已过期' },
        { status: 401 }
      )
    };
  }

  // 验证通过，返回用户信息
  return {
    success: true,
    user
  };
}

/**
 * 可选的认证（不强制要求登录）
 * @param request Next.js 请求对象
 * @returns 返回用户信息（如果有的话）
 */
export function optionalAuthenticate(request: NextRequest): User | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

/**
 * 检查用户角色权限
 * @param user 用户对象
 * @param allowedRoles 允许的角色列表
 * @returns 是否有权限
 */
export function checkRole(user: User, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.role);
}
