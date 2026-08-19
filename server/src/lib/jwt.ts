import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from './env';
import type { Role } from '../../../shared/types';

// Thong tin nhet vao token. Chi de nhung thu khong nhay cam.
export interface AuthTokenPayload {
  sub: number;   // id user
  email: string;
  role: Role;
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as unknown as AuthTokenPayload;
}
