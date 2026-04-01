/**
 * 用户模块 API
 */

import { httpClient } from "../../core/http-client";
import * as Types from "./user.types";

export const userApi = {
  /**
   * 获取用户列表（分页）
   */
  getList: (params: { pageIndex: number; pageSize: number }) => {
    return httpClient.request<Types.UserListResult>({
      url: "/users",
      method: "POST",
      body: params,
    });
  },

  /**
   * 根据 ID 获取用户
   */
  getById: (id: number) => {
    return httpClient.request<Types.User>({
      url: `/users/${id}`,
      method: "GET",
    });
  },

  /**
   * 创建用户
   */
  create: (data: Types.CreateUserInput) => {
    return httpClient.request<Types.User>({
      url: "/users/create",
      method: "POST",
      body: data,
    });
  },

  /**
   * 更新用户
   */
  update: (id: number, data: Types.UpdateUserInput) => {
    return httpClient.request<Types.User>({
      url: `/users/${id}`,
      method: "PUT",
      body: data,
    });
  },

  /**
   * 删除用户
   */
  delete: (id: number) => {
    return httpClient.request({
      url: `/users/${id}`,
      method: "DELETE",
    });
  },
};
