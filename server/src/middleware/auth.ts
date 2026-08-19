import type { RequestHandler } from 'express';
import { verifyToken } from '../lib/jwt';

// Bat buoc dang nhap. Doc token tu header: Authorization: Bearer <token>
export const requireAuth: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Chua dang nhap' });
    return;
  }
  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    res.status(401).json({ error: 'Token khong hop le hoac da het han' });
  }
};

// Bat buoc la admin. Luon dat SAU requireAuth.
export const requireAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ error: 'Chi admin moi duoc thao tac' });
    return;
  }
  next();
};
