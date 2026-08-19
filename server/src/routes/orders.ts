import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { NEXT_STATUS, type Order, type OrderStatus } from '../../../shared/types';

export const ordersRouter = Router();

const createOrderSchema = z.object({
  receiver_name: z.string().min(2, 'Ten nguoi nhan qua ngan'),
  phone: z.string().regex(/^0\d{9}$/, 'So dien thoai phai gom 10 so, bat dau bang 0'),
  address: z.string().min(5, 'Dia chi qua ngan'),
  items: z.array(z.object({
    product_id: z.number().int(),
    quantity: z.number().int().min(1),
  })).min(1, 'Gio hang dang trong'),
});

// POST /api/orders — dat hang
// Goi ham create_order trong Postgres (xem db/schema.sql):
// kiem tra ton kho + tru kho + tao don, tat ca trong 1 transaction.
// KHONG tinh tong tien tu client gui len — client co the sua gia.
ordersRouter.post('/', requireAuth, async (req, res) => {
  const body = createOrderSchema.parse(req.body);

  const { data, error } = await supabase.rpc('create_order', {
    p_user_id: req.user!.sub,
    p_receiver_name: body.receiver_name,
    p_phone: body.phone,
    p_address: body.address,
    p_items: body.items,
  });
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(201).json({ order_id: data });
});

// GET /api/orders/me — don hang cua chinh minh
ordersRouter.get('/me', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name, slug, images))')
    .eq('user_id', req.user!.sub)
    .order('created_at', { ascending: false });
  if (error) throw error;
  res.json(data ?? []);
});

// GET /api/orders/:id — chi tiet 1 don
ordersRouter.get('/:id', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name, slug, images))')
    .eq('id', req.params.id)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    res.status(404).json({ error: 'Khong tim thay don hang' });
    return;
  }
  // User thuong chi duoc xem don cua chinh minh
  if (req.user!.role !== 'admin' && data.user_id !== req.user!.sub) {
    res.status(403).json({ error: 'Khong co quyen xem don nay' });
    return;
  }
  res.json(data);
});

// GET /api/orders — admin xem tat ca don
ordersRouter.get('/', requireAuth, requireAdmin, async (req, res) => {
  const status = req.query.status as OrderStatus | undefined;
  let query = supabase
    .from('orders')
    .select('*, users(email, full_name)')
    .order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  res.json(data ?? []);
});

// PATCH /api/orders/:id/status — admin doi trang thai don
ordersRouter.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const { status } = z.object({
    status: z.enum(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled']),
  }).parse(req.body);

  const { data: current, error: e1 } = await supabase
    .from('orders').select('status').eq('id', req.params.id).maybeSingle();
  if (e1) throw e1;
  if (!current) {
    res.status(404).json({ error: 'Khong tim thay don hang' });
    return;
  }

  // Khong cho nhay lung tung: vd tu 'delivered' quay lai 'pending'
  const allowed = NEXT_STATUS[current.status as OrderStatus];
  if (!allowed.includes(status)) {
    res.status(400).json({
      error: `Khong the chuyen tu "${current.status}" sang "${status}"`,
    });
    return;
  }

  const { data, error } = await supabase
    .from('orders').update({ status }).eq('id', req.params.id).select().single();
  if (error) throw error;
  res.json(data as Order);
});
