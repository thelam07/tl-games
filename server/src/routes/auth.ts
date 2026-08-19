import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { signToken } from '../lib/jwt';
import { requireAuth } from '../middleware/auth';
import type { AuthResponse, User } from '../../../shared/types';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email('Email khong hop le'),
  password: z.string().min(6, 'Mat khau toi thieu 6 ky tu'),
  full_name: z.string().min(2, 'Ho ten qua ngan'),
});

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  const body = registerSchema.parse(req.body);

  const { data: existed } = await supabase
    .from('users').select('id').eq('email', body.email).maybeSingle();
  if (existed) {
    res.status(409).json({ error: 'Email da duoc dang ky' });
    return;
  }

  // Hash password roi moi luu. bcrypt tu sinh salt, 10 vong la du cho BTL.
  const password_hash = await bcrypt.hash(body.password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert({ email: body.email, password_hash, full_name: body.full_name })
    .select('id, email, full_name, role, created_at')
    .single();
  if (error) throw error;

  const user = data as User;
  const payload: AuthResponse = {
    token: signToken({ sub: user.id, email: user.email, role: user.role }),
    user,
  };
  res.status(201).json(payload);
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  const body = loginSchema.parse(req.body);

  const { data } = await supabase
    .from('users').select('*').eq('email', body.email).maybeSingle();

  // Sai email hay sai password deu tra 1 thong bao chung
  // -> ke tan cong khong do duoc email nao co that.
  const ok = data && (await bcrypt.compare(body.password, data.password_hash));
  if (!ok) {
    res.status(401).json({ error: 'Email hoac mat khau khong dung' });
    return;
  }

  const { password_hash: _drop, ...user } = data;
  const payload: AuthResponse = {
    token: signToken({ sub: user.id, email: user.email, role: user.role }),
    user: user as User,
  };
  res.json(payload);
});

// GET /api/auth/me — dung de client kiem tra token con han khong
authRouter.get('/me', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, full_name, role, created_at')
    .eq('id', req.user!.sub)
    .single();
  if (error) throw error;
  res.json(data as User);
});
