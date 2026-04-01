import { httpClient } from './http-client';
import type { RequestConfig } from './types';

/**
 * 设置全局拦截器
 */
export function setupInterceptors() {
  // Token 自动注入 - 请求拦截器
  httpClient.useRequest((config: RequestConfig) => {
    // 如果明确跳过认证，则不添加 token
    if (config.skipAuth) {
      return config;
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return config;
  });

  // 统一错误处理 - 响应拦截器
  httpClient.useResponse((response: any) => {
    if (!response.success) {
      // 401 未授权，跳转到登录页
      if (response.code === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
        }
      }
      // 可以在这里添加统一的错误提示
    }
    return response;
  });
}

// 自动执行拦截器设置
setupInterceptors();
