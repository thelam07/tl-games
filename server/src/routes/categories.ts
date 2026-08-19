import { Router } from 'express';
import { supabase } from '../lib/supabase';
import type { Category } from '../../../shared/types';

export const categoriesRouter = Router();

// GET /api/categories
categoriesRouter.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if (error) throw error;
  res.json((data ?? []) as Category[]);
});
