import { ApiResponse, RequestConfig } from "./types";
import {
  API_BASE_URL,
  REQUEST_TIMEOUT,
  ENABLE_REQUEST_LOGS,
} from "./constants";

/**
 * HTTP 客户端类
 */
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private requestInterceptors: Array<
    (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
  > = [];
  private responseInterceptors: any[] = [];

  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = REQUEST_TIMEOUT;
  }

  /**
   * 注册请求拦截器
   */
  useRequest(
    interceptor: (
      config: RequestConfig,
    ) => RequestConfig | Promise<RequestConfig>,
  ) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * 注册响应拦截器
   */
  useResponse(interceptor: any) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * 发起 HTTP 请求
   */
  async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // 应用请求拦截器
      let modifiedConfig = await this.applyRequestInterceptors(config);

      // 构建完整 URL
      let url = `${this.baseURL}${modifiedConfig.url}`;

      // 处理查询参数
      if (modifiedConfig.params) {
        const queryString = new URLSearchParams(
          modifiedConfig.params as Record<string, string>,
        ).toString();
        url += (url.includes("?") ? "&" : "?") + queryString;
      }

      if (ENABLE_REQUEST_LOGS) {
        console.log("[HTTP Request]", modifiedConfig.method || "GET", url);
      }

      //   相应令牌
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        ...modifiedConfig,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...modifiedConfig.headers,
        },
        body: modifiedConfig.body
          ? JSON.stringify(modifiedConfig.body)
          : undefined,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      let data: ApiResponse<T> = await response.json();

      // 应用响应拦截器
      data = await this.applyResponseInterceptors(data);

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      this.handleError(error);
      throw error;
    }
  }

  /**
   * 应用请求拦截器
   */
  private async applyRequestInterceptors(
    config: RequestConfig,
  ): Promise<RequestConfig> {
    let modifiedConfig = config;
    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  /**
   * 应用响应拦截器
   */
  private async applyResponseInterceptors<T>(
    response: ApiResponse<T>,
  ): Promise<ApiResponse<T>> {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  /**
   * 错误处理
   */
  private handleError(error: any) {
    if (error.name === "AbortError") {
      console.error("[HTTP Error] 请求超时");
    } else if (error instanceof TypeError) {
      console.error("[HTTP Error] 网络错误:", error.message);
    } else {
      console.error("[HTTP Error] 请求失败:", error);
    }
  }

  /**
   * GET 请求
   */
  get<T>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>,
  ) {
    return this.request<T>({
      url,
      method: "GET",
      params,
      ...config,
    });
  }

  /**
   * POST 请求
   */
  post<T>(url: string, body?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: "POST",
      body,
      ...config,
    });
  }

  /**
   * PUT 请求
   */
  put<T>(url: string, body?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: "PUT",
      body,
      ...config,
    });
  }

  /**
   * DELETE 请求
   */
  delete<T>(url: string, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: "DELETE",
      ...config,
    });
  }

  /**
   * PATCH 请求
   */
  patch<T>(url: string, body?: any, config?: Partial<RequestConfig>) {
    return this.request<T>({
      url,
      method: "PATCH",
      body,
      ...config,
    });
  }
}

// 创建单例
export const httpClient = new HttpClient();
