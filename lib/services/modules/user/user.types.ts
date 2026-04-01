/**
 * 用户模块类型定义
 */

import { PaginatedResult } from '../../core/types';

/**
 * 用户信息
 */
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 0 | 1;
  created_at: string;
}

/**
 * 创建用户请求参数
 */
export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

/**
 * 更新用户请求参数
 */
export interface UpdateUserInput extends Partial<Omit<CreateUserInput, 'password'>> {
  password?: string;
}

/**
 * 用户列表响应
 */
export type UserListResult = PaginatedResult<User>;
