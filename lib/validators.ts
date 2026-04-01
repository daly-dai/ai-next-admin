import { z } from 'zod';

// ========== 分类 Schema ==========

/** 创建分类 */
export const createCategorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空').max(100, '分类名称最多100个字符'),
  parent_id: z.number().int().positive().nullable().optional(),
  description: z.string().max(500, '描述最多500个字符').optional().default(''),
  sort_order: z.number().int().min(0).optional().default(0),
  status: z.number().int().min(0).max(1).optional().default(1),
});

/** 更新分类 */
export const updateCategorySchema = createCategorySchema.partial();

/** 分类查询参数 */
export const categoryQuerySchema = z.object({
  parent_id: z.coerce.number().int().optional(),
  status: z.coerce.number().int().min(0).max(1).optional(),
});

// ========== 商品 Schema ==========

/** 创建商品 */
export const createProductSchema = z.object({
  name: z.string().min(1, '商品名称不能为空').max(200, '商品名称最多200个字符'),
  description: z.string().optional().default(''),
  category_id: z.number().int().positive('请选择商品分类'),
  brand: z.string().max(100, '品牌最多100个字符').optional().default(''),
  status: z.number().int().min(0).max(1).optional().default(1),
});

/** 更新商品 */
export const updateProductSchema = createProductSchema.partial();

/** 商品查询参数 */
export const productQuerySchema = z.object({
  category_id: z.coerce.number().int().optional(),
  brand: z.string().optional(),
  status: z.coerce.number().int().min(0).max(1).optional(),
  keyword: z.string().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(10),
});

// ========== 商品图片 Schema ==========

/** 创建商品图片 */
export const createProductImageSchema = z.object({
  product_id: z.number().int().positive(),
  url: z.string().min(1, '图片URL不能为空').max(500),
  sort_order: z.number().int().min(0).optional().default(0),
  is_main: z.number().int().min(0).max(1).optional().default(0),
});

// ========== 商品SKU Schema ==========

/** 创建商品SKU */
export const createProductSkuSchema = z.object({
  product_id: z.number().int().positive(),
  sku_code: z.string().min(1, 'SKU编码不能为空').max(100, 'SKU编码最多100个字符'),
  price: z.number().positive('价格必须大于0'),
  stock: z.number().int().min(0, '库存不能为负数').optional().default(0),
  specs: z.record(z.string(), z.string()).optional(),
  status: z.number().int().min(0).max(1).optional().default(1),
});

/** 更新商品SKU */
export const updateProductSkuSchema = createProductSkuSchema.partial().omit({ product_id: true });

// ========== 导出类型 ==========

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
export type CreateProductImageInput = z.infer<typeof createProductImageSchema>;
export type CreateProductSkuInput = z.infer<typeof createProductSkuSchema>;
export type UpdateProductSkuInput = z.infer<typeof updateProductSkuSchema>;
