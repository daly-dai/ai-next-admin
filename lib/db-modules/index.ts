import type { DbModule } from './types';
import userModule from './user';
import productModule from './product';

// 按依赖顺序排列：user 必须在 product 之前（无直接依赖，但保持逻辑顺序）
// 后续新增模块在此数组追加即可
export const modules: DbModule[] = [
  userModule,
  productModule,
];
