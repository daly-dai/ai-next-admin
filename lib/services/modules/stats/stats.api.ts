/**
 * 统计模块 API
 */

import { httpClient } from '../../core/http-client';

export interface StatsData {
  overview: {
    users: number;
    articles: number;
    views: number;
  };
  recentUsers: any[];
  popularArticles: any[];
}

export const statsApi = {
  /**
   * 获取统计数据
   */
  getStats: () => {
    return httpClient.request<StatsData>({
      url: '/stats',
      method: 'GET',
    });
  },
};
