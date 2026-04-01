import type { DbModule } from './types';

const productModule: DbModule = {
  name: '商品模块',

  async createTables(pool) {
    // 创建分类表（支持树形结构：parent_id 自关联）
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        parent_id INT DEFAULT NULL COMMENT '父分类ID，NULL表示顶级分类',
        description VARCHAR(500) DEFAULT '',
        sort_order INT DEFAULT 0 COMMENT '排序权重，越小越靠前',
        status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_parent_id (parent_id),
        INDEX idx_sort_order (sort_order),
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建商品表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT COMMENT '商品详情描述',
        category_id INT NOT NULL COMMENT '所属分类',
        brand VARCHAR(100) DEFAULT '' COMMENT '品牌',
        status TINYINT DEFAULT 1 COMMENT '状态：1上架 0下架',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category_id (category_id),
        INDEX idx_status (status),
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建商品图片表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL COMMENT '所属商品',
        url VARCHAR(500) NOT NULL COMMENT '图片URL',
        sort_order INT DEFAULT 0 COMMENT '排序权重',
        is_main TINYINT DEFAULT 0 COMMENT '是否主图：1是 0否',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_product_id (product_id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建商品SKU表
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS product_skus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL COMMENT '所属商品',
        sku_code VARCHAR(100) UNIQUE NOT NULL COMMENT 'SKU编码',
        price DECIMAL(10, 2) NOT NULL COMMENT '价格',
        stock INT DEFAULT 0 COMMENT '库存',
        specs JSON COMMENT '规格属性，如 {"颜色":"黑色","尺码":"XL"}',
        status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_product_id (product_id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  },

  async seed(pool) {
    // 检查是否已有分类数据，避免重复插入
    const [existingCategories] = await pool.execute('SELECT COUNT(*) as count FROM categories');
    const categoryCount = (existingCategories as any[])[0].count;

    if (categoryCount > 0) return;

    // 顶级分类
    await pool.execute(`
      INSERT INTO categories (name, parent_id, description, sort_order) VALUES
      ('电子产品', NULL, '各类电子数码产品', 1),
      ('服装鞋帽', NULL, '男女服装、鞋子、帽子等', 2),
      ('食品饮料', NULL, '各类食品和饮料', 3);
    `);

    // 查询顶级分类ID
    const [topCategories] = await pool.execute('SELECT id, name FROM categories WHERE parent_id IS NULL ORDER BY sort_order');
    const topCats = topCategories as any[];

    const electronicsId = topCats.find((c: any) => c.name === '电子产品')?.id;
    const clothingId = topCats.find((c: any) => c.name === '服装鞋帽')?.id;

    if (electronicsId) {
      await pool.execute(`
        INSERT INTO categories (name, parent_id, description, sort_order) VALUES
        ('手机', ?, '各品牌智能手机', 1),
        ('笔记本电脑', ?, '各品牌笔记本电脑', 2),
        ('耳机音箱', ?, '耳机、音箱等音频设备', 3);
      `, [electronicsId, electronicsId, electronicsId]);
    }

    if (clothingId) {
      await pool.execute(`
        INSERT INTO categories (name, parent_id, description, sort_order) VALUES
        ('男装', ?, '男士服装', 1),
        ('女装', ?, '女士服装', 2);
      `, [clothingId, clothingId]);
    }

    // 插入示例商品
    const [phoneCategories] = await pool.execute("SELECT id FROM categories WHERE name = '手机'");
    const phoneCatId = (phoneCategories as any[])[0]?.id;

    const [laptopCategories] = await pool.execute("SELECT id FROM categories WHERE name = '笔记本电脑'");
    const laptopCatId = (laptopCategories as any[])[0]?.id;

    if (phoneCatId) {
      await pool.execute(`
        INSERT INTO products (name, description, category_id, brand) VALUES
        ('iPhone 15 Pro', 'Apple 最新旗舰手机，搭载 A17 Pro 芯片', ?, 'Apple'),
        ('Samsung Galaxy S24', '三星旗舰手机，搭载骁龙8 Gen3', ?, 'Samsung');
      `, [phoneCatId, phoneCatId]);
    }

    if (laptopCatId) {
      await pool.execute(`
        INSERT INTO products (name, description, category_id, brand) VALUES
        ('MacBook Pro 14', 'Apple M3 Pro 芯片，14英寸 Liquid Retina XDR 显示屏', ?, 'Apple');
      `, [laptopCatId]);
    }

    // 插入示例商品图片
    const [allProducts] = await pool.execute('SELECT id, name FROM products');
    const products = allProducts as any[];

    for (const product of products) {
      await pool.execute(`
        INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES
        (?, ?, 0, 1),
        (?, ?, 1, 0);
      `, [
        product.id, `/images/products/${product.id}-main.jpg`,
        product.id, `/images/products/${product.id}-detail.jpg`,
      ]);
    }

    // 插入示例SKU
    const iphone = products.find((p: any) => p.name === 'iPhone 15 Pro');
    const samsung = products.find((p: any) => p.name === 'Samsung Galaxy S24');
    const macbook = products.find((p: any) => p.name === 'MacBook Pro 14');

    if (iphone) {
      await pool.execute(`
        INSERT INTO product_skus (product_id, sku_code, price, stock, specs) VALUES
        (?, 'IPHONE15PRO-BLK-256', 7999.00, 100, ?),
        (?, 'IPHONE15PRO-WHT-256', 7999.00, 80, ?),
        (?, 'IPHONE15PRO-BLK-512', 9999.00, 50, ?);
      `, [
        iphone.id, JSON.stringify({ '颜色': '黑色', '存储': '256GB' }),
        iphone.id, JSON.stringify({ '颜色': '白色', '存储': '256GB' }),
        iphone.id, JSON.stringify({ '颜色': '黑色', '存储': '512GB' }),
      ]);
    }

    if (samsung) {
      await pool.execute(`
        INSERT INTO product_skus (product_id, sku_code, price, stock, specs) VALUES
        (?, 'GALAXY-S24-BLK-256', 5999.00, 120, ?),
        (?, 'GALAXY-S24-PUR-256', 5999.00, 90, ?);
      `, [
        samsung.id, JSON.stringify({ '颜色': '黑色', '存储': '256GB' }),
        samsung.id, JSON.stringify({ '颜色': '紫色', '存储': '256GB' }),
      ]);
    }

    if (macbook) {
      await pool.execute(`
        INSERT INTO product_skus (product_id, sku_code, price, stock, specs) VALUES
        (?, 'MBP14-M3PRO-18-512', 14999.00, 30, ?),
        (?, 'MBP14-M3PRO-36-1TB', 19999.00, 15, ?);
      `, [
        macbook.id, JSON.stringify({ '芯片': 'M3 Pro', '内存': '18GB', '存储': '512GB' }),
        macbook.id, JSON.stringify({ '芯片': 'M3 Pro', '内存': '36GB', '存储': '1TB' }),
      ]);
    }
  },
};

export default productModule;
