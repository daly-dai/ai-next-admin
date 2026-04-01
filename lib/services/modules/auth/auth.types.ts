/**
 * 认证模块类型定义
 */

import type { User } from '../user/user.types';

/**
 * 登录请求参数
 */
export interface LoginInput {
  username: string;
  password: string;
}

/**
 * 注册请求参数
 */
export interface RegisterInput extends LoginInput {
  email: string;
}

/**
 * 登录响应
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * 忘记密码请求参数
 */
export interface ForgotPasswordInput {
  email: string;
}

/**
 * 重置密码请求参数
 */
export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}
