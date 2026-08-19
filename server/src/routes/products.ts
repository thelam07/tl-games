import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { requireAuth, requireAdmin } from '../middleware/auth';
import type { Paginated, Product } from '../../../shared/types';

export const productsRouter = Router();

const listQuery = z.object({
  q: z.string().optional(),                      // tu khoa tim kiem
  category: z.coerce.number().int().optional(),  // loc theo danh muc
  min: z.coerce.number().optional(),             // gia tu
  max: z.coerce.number().optional(),             // gia den
  sort: z.enum(['newest', 'price_asc', 'price_desc']).default('newest'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

// GET /api/products?q=&category=&min=&max=&sort=&page=&limit=
productsRouter.get('/', async (req, res) => {
  const { q, category, min, max, sort, page, limit } = listQuery.parse(req.query);

  // count: 'exact' -> Supabase tra ve tong so ban ghi de tinh so trang
  let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_active', true);

  if (q) query = query.ilike('name', `%${q}%`);
  if (category) query = query.eq('category_id', category);
  if (min !== undefined) query = query.gte('price', min);
  if (max !== undefined) query = query.lte('price', max);

  if (sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (sort === 'price_desc') query = query.order('price', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const from = (page - 1) * limit;
  const { data, error, count } = await query.range(from, from + limit - 1);
  if (error) throw error;

  const result: Paginated<Product> = {
    data: (data ?? []) as Product[],
    page,
    limit,
    total: count ?? 0,
  };
  res.json(result);
});

// GET /api/products/:slug
productsRouter.get('/:slug', async (req, res) => {
  const { data, error } = await supabase
    .from('products').select('*').eq('slug', req.params.slug).maybeSingle();
  if (error) throw error;
  if (!data) {
    res.status(404).json({ error: 'Khong tim thay san pham' });
    return;
  }
  res.json(data as Product);
});

const productBody = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'slug chi gom chu thuong, so va dau -'),
  description: z.string().default(''),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  category_id: z.number().int(),
  images: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
});

// POST /api/products  (admin)
productsRouter.post('/', requireAuth, requireAdmin, async (req, res) => {
  const body = productBody.parse(req.body);
  const { data, error } = await supabase.from('products').insert(body).select().single();
  if (error) throw error;
  res.status(201).json(data as Product);
});

// PUT /api/products/:id  (admin)
productsRouter.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const body = productBody.partial().parse(req.body);
  const { data, error } = await supabase
    .from('products').update(body).eq('id', req.params.id).select().single();
  if (error) throw error;
  res.json(data as Product);
});

// DELETE /api/products/:id  (admin)
// Xoa mem: chi tat is_active. Vi don hang cu van tro toi san pham nay.
productsRouter.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from('products').update({ is_active: false }).eq('id', req.params.id);
  if (error) throw error;
  res.status(204).end();
});
