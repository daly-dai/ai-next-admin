import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// 用户数据类型
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: Date;
}

// 生成 JWT Token
export function generateToken(user: User) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// 验证 JWT Token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch (error) {
    return null;
  }
}

// 密码加密
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// 验证密码
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
