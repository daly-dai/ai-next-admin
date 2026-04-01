import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { authenticateRequest } from "@/lib/middleware";
import {
  paginatedResponse,
  parsePaginationFromBody,
} from "@/lib/api-utils";

// 获取用户列表
export async function POST(request: NextRequest) {
  try {
    // 使用统一的认证中间件
    const authResult = authenticateRequest(request);

    if (!authResult.success) {
      return authResult.response;
    }

    const body = await request.json();
    const { pageIndex, pageSize } = parsePaginationFromBody(body);

    const offset = (pageIndex - 1) * pageSize;

    // 查询用户总数
    const totalResult = (await query(
      "SELECT COUNT(*) as count FROM users",
    )) as any[];
    const total = totalResult[0].count;

    // 查询用户列表（排除密码）
    const users = (await query(
      `SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offset}`,
    )) as any[];

    // 返回分页结果
    const result = paginatedResponse(users, total, { pageIndex, pageSize });

    return NextResponse.json(result);
  } catch (error) {
    console.error("获取用户列表失败:", error);
    return NextResponse.json(
      { success: false, message: "服务器错误" },
      { status: 500 },
    );
  }
}
