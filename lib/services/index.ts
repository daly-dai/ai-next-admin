/**
 * API 服务层统一入口
 * 
 * 使用示例：
 * import { userApi, authApi, statsApi, User } from '@/lib/services';
 */

// 核心导出
export { httpClient } from './core/http-client';
export * from './core/types';

// 业务模块导出
export { userApi } from './modules/user';
export type { User, CreateUserInput, UpdateUserInput, UserListResult } from './modules/user';

export { authApi } from './modules/auth';
export type { LoginInput, RegisterInput, AuthResponse } from './modules/auth';

export { statsApi } from './modules/stats';
export type { StatsData } from './modules/stats';

// 未来新增模块只需在此添加导出即可
// export { articleApi, Article } from './modules/article';
// export { productApi, Product } from './modules/product';
