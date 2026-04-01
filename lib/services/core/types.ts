/**
 * 基础类型定义
 */

/**
 * API 统一响应格式
 */
export interface ApiResponse<T = any> {
  success: boolean;
  code?: number;
  message: string;
  data?: T;
}

/**
 * 请求配置
 */
export interface RequestConfig extends Omit<RequestInit, 'body'> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  params?: Record<string, any>;
  skipAuth?: boolean; // 是否跳过认证
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * 分页结果
 */
export interface PaginatedResult<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 请求拦截器函数
 */
export type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;

/**
 * 响应拦截器函数
 */
export type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
