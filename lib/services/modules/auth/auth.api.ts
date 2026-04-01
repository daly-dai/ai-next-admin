/**
 * 认证模块 API
 */

import { httpClient } from '../../core/http-client';
import type { LoginInput, RegisterInput, AuthResponse, ForgotPasswordInput, ResetPasswordInput } from './auth.types';

export const authApi = {
  /**
   * 用户登录
   */
  login: (credentials: LoginInput) => {
    return httpClient.request<AuthResponse>({
      url: '/auth/login',
      method: 'POST',
      body: credentials,
      skipAuth: true, // 登录接口不需要 token
    });
  },

  /**
   * 用户注册
   */
  register: (data: RegisterInput) => {
    return httpClient.request<AuthResponse>({
      url: '/auth/register',
      method: 'POST',
      body: data,
      skipAuth: true,
    });
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: () => {
    return httpClient.request<AuthResponse['user']>({
      url: '/auth/me',
      method: 'GET',
    });
  },

  /**
   * 退出登录
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * 忘记密码
   */
  forgotPassword: (data: ForgotPasswordInput) => {
    return httpClient.request({
      url: '/auth/forgot-password',
      method: 'POST',
      body: data,
      skipAuth: true,
    });
  },

  /**
   * 重置密码
   */
  resetPassword: (data: ResetPasswordInput) => {
    return httpClient.request({
      url: '/auth/reset-password',
      method: 'POST',
      body: data,
      skipAuth: true,
    });
  },
};
