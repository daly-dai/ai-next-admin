/**
 * 常量配置
 */

// API 基础 URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// 请求超时时间（毫秒）
export const REQUEST_TIMEOUT = 10000;

// 是否启用请求日志（开发环境）
export const ENABLE_REQUEST_LOGS = process.env.NODE_ENV === 'development';
