import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { authenticateRequest } from '@/lib/middleware';

// 获取统计数据
export async function GET(request: NextRequest) {
  try {
    // 使用统一的认证中间件
    const authResult = authenticateRequest(request);
    
    if (!authResult.success) {
      return authResult.response;
    }

    // 查询用户总数
    const userCountResult = await query('SELECT COUNT(*) as count FROM users') as any[];
    const userCount = userCountResult[0].count;

    // 查询文章总数
    const articleCountResult = await query('SELECT COUNT(*) as count FROM articles') as any[];
    const articleCount = articleCountResult[0].count;

    // 查询总浏览量
    const viewsResult = await query('SELECT SUM(views) as total FROM articles') as any[];
    const totalViews = viewsResult[0].total || 0;

    // 查询最近注册用户
    const recentUsers = await query(
      'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC LIMIT 5'
    ) as any[];

    // 查询热门文章
    const popularArticles = await query(
      'SELECT id, title, views FROM articles ORDER BY views DESC LIMIT 5'
    ) as any[];

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          users: userCount,
          articles: articleCount,
          views: totalViews,
        },
        recentUsers,
        popularArticles,
      },
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
