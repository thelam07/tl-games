import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';

// Route khong ton tai
export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Khong tim thay endpoint nay' });
};

// Gom moi loi ve 1 cho -> response luon cung dinh dang { error: string }
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const msg = err.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    res.status(400).json({ error: msg });
    return;
  }
  console.error('[ERROR]', err);
  const status = typeof err?.status === 'number' ? err.status : 500;
  res.status(status).json({ error: err?.message ?? 'Loi may chu' });
};
