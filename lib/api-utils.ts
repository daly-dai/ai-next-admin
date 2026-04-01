import { NextResponse } from 'next/server';

/**
 * 统一成功响应
 */
export function successResponse<T>(data: T, message = '操作成功', status = 200) {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

/**
 * 统一错误响应
 */
export function errorResponse(message = '操作失败', status = 400, errors?: Record<string, string[]>) {
  const body: { success: false; message: string; errors?: Record<string, string[]> } = {
    success: false,
    message,
  };
  if (errors) {
    body.errors = errors;
  }
  return NextResponse.json(body, { status });
}

/**
 * 分页参数
 */
export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
}

/**
 * 从请求 URL 中解析分页参数
 */
export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const pageIndex = Math.max(1, parseInt(searchParams.get('pageIndex') || '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));
  return { pageIndex, pageSize };
}

/**
 * 从请求 body 中解析分页参数
 */
export function parsePaginationFromBody(body: Record<string, string>): PaginationParams {
  const pageIndex = Math.max(1, parseInt(body.pageIndex || '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(body.pageSize || '10', 10)));
  return { pageIndex, pageSize };
}


/**
 * 统一分页响应
 */
export function paginatedResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationParams,
) {
  return NextResponse.json({
    success: true,
    message: '查询成功',
    data,
    pagination: {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      total,
      totalPages: Math.ceil(total / pagination.pageSize),
    },
  });
}
