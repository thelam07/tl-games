import type { AuthTokenPayload } from '../lib/jwt';

// Bao cho TypeScript biet: sau khi qua middleware auth, req.user co ton tai.
declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export {};
