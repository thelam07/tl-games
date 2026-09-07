import { Router } from 'express';
import { supabase } from '../lib/supabase.js';

export const sanPhamRouter = Router();

sanPhamRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('san_pham').select('*');
  if (error) {
    res.status(500).send('Error');
  } else {
    res.json(data);
  }
});