// 不需要认证的公开页面路径白名单
export const PUBLIC_PATHS = [
  '/admin/login',      // 登录页
  '/admin/register',   // 注册页（待实现）
  '/admin/forgot-password', // 忘记密码（待实现）
];

// 判断某个路径是否在白名单中
export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(publicPath => 
    pathname === publicPath || pathname.startsWith(publicPath + '/')
  );
}
